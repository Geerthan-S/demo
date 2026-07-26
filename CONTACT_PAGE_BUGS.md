# Contact Page - Bug Report

**Generated:** 2026-06-29  
**Tested Using:** Playwright MCP + Code Review  
**Status:** Multiple critical bugs found that prevent form from working

---

## 🔴 CRITICAL BUG #1: Content-Type Mismatch (BLOCKING)

**Severity:** CRITICAL - Blocks all form submissions  
**Impact:** The contact form will fail 100% of the time

### Issue
The ContactForm component sends data as `FormData`, but the API route expects JSON.

### Location
- **Frontend:** `src/components/contact/ContactForm.tsx:149-157`
- **Backend:** `src/app/api/contact/route.ts:14`

### Code Evidence

**Frontend (ContactForm.tsx:149-157):**
```typescript
const response = await fetch("/api/contact", {
  method: "POST",
  body: formDataToSend,  // ← Sends FormData
});
```

**Backend (route.ts:14):**
```typescript
const body = await request.json();  // ← Expects JSON
```

### Why This Breaks
When the API receives FormData and tries to parse it as JSON, it will throw an error. The request will fail before any validation or database operations occur.

### Fix Required
Either:
1. **Option A (Recommended):** Change the API to accept FormData using `await request.formData()`
2. **Option B:** Change the frontend to send JSON instead of FormData (but this breaks file uploads)

Since the form includes file uploads, **Option A is required**.

---

## 🔴 CRITICAL BUG #2: Field Mismatch Between Frontend and Backend

**Severity:** CRITICAL - Data loss  
**Impact:** All enhanced form fields are silently ignored

### Issue
The new ContactForm sends 10+ fields including inquiry types, priorities, categories, and attachments. The API only validates and saves 4 fields: name, email, phone, message.

### Location
- **Frontend sends:** `src/components/contact/ContactForm.tsx:122-147`
- **Backend validates:** `src/app/api/contact/route.ts:5-10`

### Fields Being Ignored
These fields are sent by the frontend but completely ignored by the backend:
- `inquiryType` (General/Project/Grievance)
- `company`
- `grievanceCategory`
- `projectLocation`
- `priorityLevel`
- `preferredContactMethod`
- `attachments[]` (files)

### Code Evidence

**Zod Schema (route.ts:5-10):**
```typescript
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});
```

### Impact
- Inquiry type (General/Project/Grievance) is not saved
- Priority levels for urgent issues are lost
- Grievance categories are not recorded
- File attachments disappear
- Contact preferences are ignored

### Fix Required
1. Update the Zod schema to include all new fields
2. Update the database schema to store these fields
3. Handle file uploads appropriately (save to disk/S3 and store references)

---

## 🟡 BUG #3: Missing Required Field Validation

**Severity:** HIGH - Poor UX  
**Impact:** Users can submit incomplete forms

### Issue
Several fields are marked with asterisks (*) indicating they're required, but there's no client-side validation enforcing this. The form will submit with these fields empty.

### Fields Affected

#### Priority Level (for Project and Grievance inquiries)
- **Location:** `src/components/contact/ContactForm.tsx:256-272`
- **Marked as required:** Yes (shows "*")
- **Validation:** None
- **Impact:** Users can submit urgent grievances without indicating priority

#### Preferred Contact Method (all inquiry types)
- **Location:** `src/components/contact/ContactForm.tsx:274-290`
- **Marked as required:** Yes (shows "*")
- **Validation:** None
- **Impact:** Users can submit without indicating how they want to be contacted

### Code Evidence
```typescript
<Select
  value={formData.priorityLevel}
  onValueChange={(value) => handleSelectChange("priorityLevel", value)}
>
  <SelectTrigger>
    <SelectValue placeholder="Priority Level *" />  {/* Shows * but not enforced */}
  </SelectTrigger>
```

### Fix Required
Add validation before form submission:
```typescript
if ((inquiryType === "Project" || inquiryType === "Grievance") && !formData.priorityLevel) {
  setError("Priority level is required");
  return;
}
if (!formData.preferredContactMethod) {
  setError("Preferred contact method is required");
  return;
}
```

---

## 🟡 BUG #4: Missing Grievance Category Validation

**Severity:** HIGH - Data quality issue  
**Impact:** Grievances can be submitted without categorization

### Issue
When users select "Grievance / Complaint" as inquiry type, they must select a category. The field shows a "*" but there's no validation enforcing it.

### Location
`src/components/contact/ContactForm.tsx:228-246`

### Code Evidence
```typescript
{inquiryType === "Grievance" && (
  <Select
    value={formData.grievanceCategory}
    onValueChange={(value) =>
      handleSelectChange("grievanceCategory", value)
    }
  >
    <SelectTrigger>
      <SelectValue placeholder="Grievance Category *" />  {/* Shows * but not enforced */}
    </SelectTrigger>
```

### Fix Required
Add validation:
```typescript
if (inquiryType === "Grievance" && !formData.grievanceCategory) {
  setError("Grievance category is required");
  return;
}
```

---

## 🟡 BUG #5: File Attachments Not Handled

**Severity:** MEDIUM - Feature not implemented  
**Impact:** File uploads silently fail

### Issue
The form allows users to upload files (PDF, JPG, PNG up to 5MB each), validates them on the client side, and sends them to the server. However, the API has zero code to handle file uploads.

### Location
- **Frontend upload:** `src/components/contact/ContactForm.tsx:145-147`
- **Backend handling:** None (route.ts has no file handling code)

### Code Evidence

**Frontend sends files:**
```typescript
formData.attachments.forEach((file) => {
  formDataToSend.append("attachments", file);
});
```

**Backend ignores them:**
```typescript
// No code to read attachments from request
// No code to save files
// No code to store file references
```

### Impact
Users can upload files thinking they're being sent, but they're silently discarded. This is particularly problematic for grievances where photo evidence might be crucial.

### Fix Required
1. Read files from FormData: `const formData = await request.formData()`
2. Save files to disk or cloud storage
3. Store file references in database
4. Consider file size limits, virus scanning, and cleanup policies

---

## 🟢 BUG #6: No Phone Number Format Validation

**Severity:** LOW - Data quality issue  
**Impact:** Invalid phone numbers accepted

### Issue
Phone field is marked as required but accepts any string with no format validation.

### Location
- **Frontend:** `src/components/contact/ContactForm.tsx:213-218`
- **Backend:** `src/app/api/contact/route.ts:8`

### Examples That Pass Validation
- "abc"
- "1"
- "hello"
- "12345678901234567890"

### Fix Required
Add phone number validation:
```typescript
phone: z.string()
  .trim()
  .regex(/^[\d\s\+\-\(\)]+$/, "Invalid phone number format")
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number too long")
```

---

## Summary

### Critical Issues (Must Fix)
1. **Content-Type mismatch** - Form submissions fail 100% of the time
2. **Field mismatch** - Enhanced form data is silently discarded

### High Priority Issues (Should Fix)
3. **Missing required field validation** - Priority level and contact method
4. **Missing grievance category validation** - Grievances without categories

### Medium Priority Issues (Should Fix)
5. **File uploads not handled** - Files silently discarded

### Low Priority Issues (Nice to Fix)
6. **Phone validation** - Accept invalid phone numbers

---

## Recommended Fix Order

1. **First:** Fix Bug #1 (Content-Type) - Nothing works until this is fixed
2. **Second:** Fix Bug #2 (Field Mismatch) - Update API and database schema
3. **Third:** Fix Bug #5 (File Uploads) - Complete the feature
4. **Fourth:** Fix Bugs #3 and #4 (Required field validation) - Better UX
5. **Fifth:** Fix Bug #6 (Phone validation) - Data quality

---

## Testing Notes

### Manual Testing Performed
- Filled out contact form with test data
- Observed form behavior with Playwright
- Reviewed all form fields and validation
- Checked network requests (would fail at API)

### Testing Not Completed
- Could not test actual form submission due to Bug #1 blocking all requests
- Could not verify file upload behavior
- Could not test success/error states

### Recommended Tests After Fixes
1. Submit each inquiry type (General, Project, Grievance)
2. Test required field validation
3. Upload files of various sizes and types
4. Test with invalid phone numbers
5. Test with missing required fields
6. Verify all data is saved to database correctly
