"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Send,
    Check,
    Loader2,
    Upload,
    Link as LinkIcon,
    X,
} from "lucide-react";
import styles from "./page.module.css";
import Navigation from "@/components/Navigation";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

type SubmitMethod = "link" | "file";

export default function ShareSkinPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        telegram: "",
        skinLink: ""
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [submitMethod, setSubmitMethod] = useState<SubmitMethod>("link");
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form validation
    const validateForm = () => {
        const errors: Record<string, string> = {};

        // Name validation
        const trimmedName = formData.name.trim();
        if (!trimmedName) {
            errors.name = "Name is required";
        } else if (trimmedName.length < 2) {
            errors.name = "Name must be at least 2 characters";
        } else if (trimmedName.length > 50) {
            errors.name = "Name must be less than 50 characters";
        }

        // Email validation
        const trimmedEmail = formData.email.trim();
        if (!trimmedEmail) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            errors.email = "Please enter a valid email";
        } else if (trimmedEmail.length > 100) {
            errors.email = "Email must be less than 100 characters";
        }

        // Telegram validation
        const trimmedTelegram = formData.telegram.trim().replace(/^@/, "");
        if (!trimmedTelegram) {
            errors.telegram = "Telegram username is required";
        } else if (trimmedTelegram.length < 5) {
            errors.telegram = "Telegram username must be at least 5 characters";
        } else if (trimmedTelegram.length > 32) {
            errors.telegram = "Telegram username must be less than 32 characters";
        } else if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(trimmedTelegram)) {
            errors.telegram = "Invalid Telegram username format";
        }

        // Skin link validation
        if (submitMethod === "link") {
            const trimmedLink = formData.skinLink.trim();
            if (!trimmedLink) {
                errors.skinLink = "Download link is required";
            } else {
                try {
                    const url = new URL(trimmedLink);
                    if (!['http:', 'https:'].includes(url.protocol)) {
                        errors.skinLink = "Link must start with http:// or https://";
                    }
                } catch {
                    errors.skinLink = "Please enter a valid URL";
                }
            }
        }

        // File validation
        if (submitMethod === "file") {
            if (!selectedFile) {
                errors.file = "Please select a file to upload";
            } else {
                // Max file size: 20MB
                const maxSize = 20 * 1024 * 1024;
                if (selectedFile.size > maxSize) {
                    errors.file = "File size must be less than 20MB";
                }
                // Check file type
                const allowedTypes = ['.zip', '.rar', '.7z'];
                const fileName = selectedFile.name.toLowerCase();
                const hasValidExtension = allowedTypes.some(ext => fileName.endsWith(ext));
                if (!hasValidExtension) {
                    errors.file = "File type not allowed. Use .zip, .rar, .7z";
                }
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Form submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setFormStatus("loading");
        setErrorMessage("");

        try {
            const submitData = new FormData();
            submitData.append("name", formData.name);
            submitData.append("email", formData.email);
            submitData.append("telegram", formData.telegram);

            if (submitMethod === "link") {
                submitData.append("skinLink", formData.skinLink);
            } else if (selectedFile) {
                submitData.append("skinFile", selectedFile);
            }

            const response = await fetch("/api/submit-skin", {
                method: "POST",
                body: submitData,
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            setFormStatus("success");
        } catch {
            setFormStatus("error");
            setErrorMessage("Failed to submit. Please try again.");
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({ name: "", email: "", telegram: "", skinLink: "" });
        setSelectedFile(null);
        setFormErrors({});
        setFormStatus("idle");
        setErrorMessage("");
    };

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFormErrors({ ...formErrors, file: "" });
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={styles.page}>
            {/* Navigation */}
            <Navigation activeRoute="/share-skin" />

            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className={styles.heroContent}
                    >
                        <motion.div variants={fadeInUp} className={styles.catContainer}>
                            <Image
                                src="/aneko/mati1.png"
                                alt="ANeko"
                                width={80}
                                height={80}
                                className={styles.catImage}
                            />
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className={styles.title}>
                            Share Your Skin
                        </motion.h1>
                        <motion.p variants={fadeInUp} className={styles.subtitle}>
                            Created a custom ANeko skin? Share it with the community!
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Form Section */}
            <section className={styles.formSection}>
                <div className="container">
                    <motion.div
                        className={styles.formCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {formStatus === "success" ? (
                            <div className={styles.successMessage}>
                                <div className={styles.successIcon}>
                                    <Check size={32} strokeWidth={3} />
                                </div>
                                <h3>Submission Received!</h3>
                                <p>We&apos;ll review your skin and contact you via Telegram.</p>
                                <button className={styles.resetButton} onClick={resetForm}>
                                    Submit Another
                                </button>
                            </div>
                        ) : (
                            <form className={styles.form} onSubmit={handleSubmit}>
                                {/* Personal Info */}
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel} htmlFor="name">
                                        Your Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className={styles.formInput}
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        disabled={formStatus === "loading"}
                                    />
                                    {formErrors.name && <span className={styles.formError}>{formErrors.name}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel} htmlFor="email">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className={styles.formInput}
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        disabled={formStatus === "loading"}
                                    />
                                    {formErrors.email && <span className={styles.formError}>{formErrors.email}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel} htmlFor="telegram">
                                        Telegram Username
                                    </label>
                                    <div className={styles.inputWithPrefix}>
                                        <span className={styles.inputPrefix}>@</span>
                                        <input
                                            id="telegram"
                                            type="text"
                                            className={styles.formInput}
                                            placeholder="username"
                                            value={formData.telegram}
                                            onChange={(e) => setFormData({ ...formData, telegram: e.target.value.replace(/^@/, "") })}
                                            disabled={formStatus === "loading"}
                                        />
                                    </div>
                                    {formErrors.telegram && <span className={styles.formError}>{formErrors.telegram}</span>}
                                </div>

                                {/* Skin Upload Method */}
                                <div className={styles.methodSelector}>
                                    <label className={styles.formLabel}>How would you like to share your skin?</label>
                                    <div className={styles.methodButtons}>
                                        <button
                                            type="button"
                                            className={`${styles.methodButton} ${submitMethod === "link" ? styles.active : ""}`}
                                            onClick={() => setSubmitMethod("link")}
                                        >
                                            <LinkIcon size={18} />
                                            Provide Link
                                        </button>
                                        <button
                                            type="button"
                                            className={`${styles.methodButton} ${submitMethod === "file" ? styles.active : ""}`}
                                            onClick={() => setSubmitMethod("file")}
                                        >
                                            <Upload size={18} />
                                            Upload File
                                        </button>
                                    </div>
                                </div>

                                {submitMethod === "link" ? (
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel} htmlFor="skinLink">
                                            Download Link
                                        </label>
                                        <input
                                            id="skinLink"
                                            type="url"
                                            className={styles.formInput}
                                            placeholder="https://drive.google.com/..."
                                            value={formData.skinLink}
                                            onChange={(e) => setFormData({ ...formData, skinLink: e.target.value })}
                                            disabled={formStatus === "loading"}
                                        />
                                        {formErrors.skinLink && <span className={styles.formError}>{formErrors.skinLink}</span>}
                                    </div>
                                ) : (
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Skin File</label>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".zip,.rar,.7z,.png,.jpg,.jpeg"
                                            onChange={handleFileChange}
                                            className={styles.fileInputHidden}
                                            disabled={formStatus === "loading"}
                                        />
                                        {selectedFile ? (
                                            <div className={styles.filePreview}>
                                                <span className={styles.fileName}>{selectedFile.name}</span>
                                                <button
                                                    type="button"
                                                    className={styles.removeFile}
                                                    onClick={removeFile}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                className={styles.fileSelectButton}
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <Upload size={20} />
                                                Choose File
                                            </button>
                                        )}
                                        {formErrors.file && <span className={styles.formError}>{formErrors.file}</span>}
                                        <p className={styles.fileHint}>Accepts .zip, .rar, .7z</p>
                                    </div>
                                )}

                                {errorMessage && (
                                    <div className={styles.errorBanner}>{errorMessage}</div>
                                )}

                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                    disabled={formStatus === "loading"}
                                >
                                    {formStatus === "loading" ? (
                                        <>
                                            <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Submit Skin
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
