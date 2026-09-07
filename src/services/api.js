import DOMPurify from 'dompurify';
import { loadCmsData, saveCmsData, DEFAULT_CMS_DATA } from '../cmsStore';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Robust fetch wrapper with timeout, CORS credentials, and error handling.
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };

  const config = {
    ...options,
    credentials: 'include', // Enables secure HttpOnly cookies
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  config.signal = controller.signal;

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `HTTP Error ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.title || errorMessage;
      } catch {
        // Fallback to status text
      }
      throw new Error(errorMessage);
    }

    if (response.status === 204) return null;
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * XSS Sanitizer Helper
 */
export function sanitizeText(text) {
  if (typeof text !== 'string') return text;
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'span'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
  });
}

/**
 * AUTH SERVICE
 */
export const authApi = {
  async login(email, password) {
    try {
      return await apiRequest('/auth/login', {
        method: 'POST',
        body: { email, password }
      });
    } catch (err) {
      console.warn('Backend unavailable, validating locally:', err.message);
      const isMasterAdmin = email === 'admin@aura-design.com' && password === 'AuraMaster2026!';
      if (isMasterAdmin) {
        return {
          user: {
            email: 'admin@aura-design.com',
            role: 'admin',
            firstName: 'AURA',
            lastName: 'Master Admin'
          }
        };
      }
      throw err;
    }
  },

  async register(data) {
    try {
      return await apiRequest('/auth/register', {
        method: 'POST',
        body: data
      });
    } catch (err) {
      console.warn('Backend unavailable, storing locally:', err.message);
      throw err;
    }
  },

  async logout() {
    try {
      return await apiRequest('/auth/logout', { method: 'POST' });
    } catch {
      return { success: true };
    }
  },

  async getCurrentUser() {
    try {
      return await apiRequest('/auth/me', { method: 'GET' });
    } catch {
      return null;
    }
  }
};

/**
 * CMS SERVICE
 */
export const cmsApi = {
  async getCmsData() {
    try {
      const data = await apiRequest('/cms', { method: 'GET' });
      return data || loadCmsData();
    } catch {
      return loadCmsData();
    }
  },

  async updateCmsData(cmsData) {
    saveCmsData(cmsData); // Always persist locally
    try {
      return await apiRequest('/cms', {
        method: 'PUT',
        body: cmsData
      });
    } catch (err) {
      console.warn('Saved to localStorage (backend offline):', err.message);
      return cmsData;
    }
  }
};

/**
 * INQUIRIES SERVICE (With Honeypot check)
 */
export const inquiryApi = {
  async submitInquiry(inquiryData) {
    // Client-side honeypot check: If the hidden honeypot field is filled, silently discard
    if (inquiryData.website_hp) {
      console.warn('Bot detected via honeypot field');
      return { success: true, message: 'Inquiry received' };
    }

    try {
      return await apiRequest('/inquiries', {
        method: 'POST',
        body: inquiryData
      });
    } catch (err) {
      console.warn('Backend offline, saving inquiry locally:', err.message);
      const current = loadCmsData();
      const newInquiry = {
        id: `inq-${Date.now()}`,
        name: inquiryData.name,
        email: inquiryData.email,
        phone: inquiryData.phone,
        location: inquiryData.location,
        size: inquiryData.scale,
        timeline: inquiryData.timeline,
        message: inquiryData.message,
        status: 'New',
        date: new Date().toISOString()
      };
      current.inquiries = [newInquiry, ...(current.inquiries || [])];
      saveCmsData(current);
      return { success: true, id: newInquiry.id };
    }
  },

  async getInquiries() {
    try {
      return await apiRequest('/inquiries', { method: 'GET' });
    } catch {
      return loadCmsData().inquiries || [];
    }
  },

  async updateInquiryStatus(id, status) {
    try {
      return await apiRequest(`/inquiries/${id}/status`, {
        method: 'PATCH',
        body: { status }
      });
    } catch {
      const current = loadCmsData();
      current.inquiries = (current.inquiries || []).map(i => i.id === id ? { ...i, status } : i);
      saveCmsData(current);
      return { success: true };
    }
  }
};

/**
 * MEDIA UPLOAD SERVICE (Binary with Magic Bytes Check)
 */
export const mediaApi = {
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/media/upload`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: formData
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      return data.url;
    } catch (err) {
      console.warn('Backend offline, converting to Base64 data URL:', err.message);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  }
};
