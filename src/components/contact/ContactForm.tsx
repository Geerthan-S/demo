"use client";

import React, { useState } from "react";
import { Upload, X, Mail, Phone, MessageSquare, AlertTriangle, FileText, Circle, Shield, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type InquiryType = "General" | "Project" | "Grievance";

interface FormData {
  inquiryType: InquiryType;
  name: string;
  email: string;
  phone: string;
  company: string;
  grievanceCategory: string;
  projectLocation: string;
  priorityLevel: string;
  preferredContactMethod: string;
  message: string;
  attachments: File[];
}

const GRIEVANCE_CATEGORIES = [
  "Quality Issue",
  "Safety Concern",
  "Timeline Delay",
  "Budget Dispute",
  "Communication Issue",
  "Other",
];

const PRIORITY_LEVELS = ["Low", "Medium", "High", "Urgent"];

const CONTACT_METHODS = ["Email", "Phone", "Either"];

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("General");
  const [formData, setFormData] = useState<FormData>({
    inquiryType: "General",
    name: "",
    email: "",
    phone: "",
    company: "",
    grievanceCategory: "",
    projectLocation: "",
    priorityLevel: "",
    preferredContactMethod: "",
    message: "",
    attachments: [],
  });

  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const MAX_CHARS = 3000;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "message") {
      setCharCount(value.length);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInquiryTypeChange = (type: InquiryType) => {
    setInquiryType(type);
    setFormData((prev) => ({ ...prev, inquiryType: type }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} exceeds 5MB limit`);
        return false;
      }
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setError(`${file.name} has invalid file type`);
        return false;
      }
      return true;
    });

    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles],
    }));
    setError("");
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate required fields based on inquiry type
    if (!formData.preferredContactMethod) {
      setError("Please select your preferred contact method");
      setLoading(false);
      return;
    }

    if (inquiryType === "Grievance" && !formData.grievanceCategory) {
      setError("Please select a grievance category");
      setLoading(false);
      return;
    }

    if ((inquiryType === "Project" || inquiryType === "Grievance") && !formData.priorityLevel) {
      setError("Please select a priority level");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("inquiryType", formData.inquiryType);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("company", formData.company);
      if (formData.grievanceCategory) {
        formDataToSend.append("grievanceCategory", formData.grievanceCategory);
      }
      if (formData.projectLocation) {
        formDataToSend.append("projectLocation", formData.projectLocation);
      }
      if (formData.priorityLevel) {
        formDataToSend.append("priorityLevel", formData.priorityLevel);
      }
      if (formData.preferredContactMethod) {
        formDataToSend.append(
          "preferredContactMethod",
          formData.preferredContactMethod
        );
      }
      formDataToSend.append("message", formData.message);

      formData.attachments.forEach((file) => {
        formDataToSend.append("attachments", file);
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit form");
      }

      window.location.href = "/contact/thank-you";
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Inquiry Type Tabs */}
      <div className="flex gap-3 flex-wrap">
        {(["General", "Project", "Grievance"] as const).map((type) => {
          const Icon = type === "General" ? Circle : type === "Project" ? FileText : AlertTriangle;
          return (
            <button
              key={type}
              type="button"
              onClick={() => handleInquiryTypeChange(type)}
              className={cn(
                "px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2",
                inquiryType === type
                  ? "bg-[#8A3841] text-white font-bold"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              )}
            >
              <Icon className="w-4 h-4" />
              {type === "Grievance"
                ? "Grievance / Complaint"
                : type === "Project"
                  ? "Project Request"
                  : "General Inquiry"}
            </button>
          );
        })}
      </div>

      {/* Basic Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="name"
          placeholder="Full Name *"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <Input
          name="phone"
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <Input
          name="company"
          placeholder="Company / Organization"
          value={formData.company}
          onChange={handleInputChange}
        />
      </div>

      {/* Conditional Fields Based on Inquiry Type */}
      {inquiryType === "Grievance" && (
        <Select
          value={formData.grievanceCategory}
          onValueChange={(value) =>
            handleSelectChange("grievanceCategory", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Grievance Category *" />
          </SelectTrigger>
          <SelectContent>
            {GRIEVANCE_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Input
        name="projectLocation"
        placeholder="Project / Site / Location (If applicable)"
        value={formData.projectLocation}
        onChange={handleInputChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(inquiryType === "Project" || inquiryType === "Grievance") && (
          <Select
            value={formData.priorityLevel}
            onValueChange={(value) => handleSelectChange("priorityLevel", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority Level *" />
            </SelectTrigger>
            <SelectContent>
              {PRIORITY_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Select
          value={formData.preferredContactMethod}
          onValueChange={(value) =>
            handleSelectChange("preferredContactMethod", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Preferred Contact Method *" />
          </SelectTrigger>
          <SelectContent>
            {CONTACT_METHODS.map((method) => (
              <SelectItem key={method} value={method}>
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Message Textarea with Character Counter */}
      <div className="space-y-2">
        <Textarea
          name="message"
          placeholder={
            inquiryType === "Grievance"
              ? "Please describe your grievance in detail *"
              : "Please describe your inquiry in detail *"
          }
          value={formData.message}
          onChange={handleInputChange}
          maxLength={MAX_CHARS}
          required
          rows={6}
        />
        <div className="text-right text-sm text-gray-500">
          {charCount} / {MAX_CHARS}
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-700">
          Upload Documents / Photos (Optional)
        </p>
        <label className="block">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition">
            <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-1">
              Choose files or drag & drop
            </p>
            <p className="text-xs text-gray-500">
              PDF, JPG, PNG (Max. 5MB each)
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </label>

        {/* File List */}
        {formData.attachments.length > 0 && (
          <div className="space-y-2">
            {formData.attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <span className="text-sm text-gray-700">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy Note */}
      <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
        <Shield className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-gray-700">
            Your information is secure
          </p>
          <p className="text-xs text-gray-600">
            We respect your privacy. Your details will only be used to address your concern.
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#8A3841] hover:bg-[#6B2F33] text-white py-3 rounded-lg font-bold uppercase flex items-center justify-center gap-2"
      >
        {loading ? (
          "Submitting..."
        ) : (
          <>
            {inquiryType === "Grievance"
              ? "Submit Grievance"
              : inquiryType === "Project"
                ? "Submit Project Request"
                : "Send Message"}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  );
}
