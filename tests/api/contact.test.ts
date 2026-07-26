import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/contact/route';
import { NextRequest } from 'next/server';

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: vi.fn().mockResolvedValue({ messageId: 'test-message-id' }),
    })),
  },
}));

vi.mock('@/lib/prisma', () => ({
  canUseDatabase: vi.fn(() => true),
  getPrisma: vi.fn(() => ({
    contactMessage: {
      create: vi.fn().mockResolvedValue({
        id: 'test-id',
        inquiryType: 'General',
        name: 'Test User',
        email: 'test@example.com',
        phone: '9876543210',
        company: 'Test Company',
        message: 'Test message',
        preferredContactMethod: 'Email',
        createdAt: new Date(),
      }),
    },
  })),
}));

describe('Contact API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should accept FormData and send email notification', async () => {
    const formData = new FormData();
    formData.append('inquiryType', 'General');
    formData.append('name', 'Test User');
    formData.append('email', 'test@example.com');
    formData.append('phone', '9876543210');
    formData.append('company', 'Test Company');
    formData.append('preferredContactMethod', 'Email');
    formData.append('message', 'This is a test message');

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
  });

  it('should validate required fields', async () => {
    const formData = new FormData();
    formData.append('name', 'T');
    formData.append('email', 'invalid-email');
    formData.append('phone', '123');
    formData.append('message', 'Short');

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);

    expect(response.status).toBe(422);
  });

  it('should handle all inquiry types', async () => {
    const inquiryTypes = ['General', 'Project', 'Grievance'] as const;

    for (const inquiryType of inquiryTypes) {
      const formData = new FormData();
      formData.append('inquiryType', inquiryType);
      formData.append('name', 'Test User');
      formData.append('email', 'test@example.com');
      formData.append('phone', '9876543210');
      formData.append('preferredContactMethod', 'Email');
      formData.append('message', 'Test message for inquiry type');

      if (inquiryType === 'Grievance') {
        formData.append('grievanceCategory', 'Quality Issue');
      }

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
    }
  });

  it('should handle file attachments', async () => {
    const formData = new FormData();
    formData.append('inquiryType', 'General');
    formData.append('name', 'Test User');
    formData.append('email', 'test@example.com');
    formData.append('phone', '9876543210');
    formData.append('preferredContactMethod', 'Email');
    formData.append('message', 'Test message with attachment');

    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    formData.append('attachments', file);

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
  });

  it('should require preferredContactMethod', async () => {
    const formData = new FormData();
    formData.append('inquiryType', 'General');
    formData.append('name', 'Test User');
    formData.append('email', 'test@example.com');
    formData.append('phone', '9876543210');
    formData.append('message', 'Test message');

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);

    expect(response.status).toBe(422);
  });
});
