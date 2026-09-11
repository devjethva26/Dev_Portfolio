/**
 * ============================================================================
 * admin.js — Admin Panel Controller
 * ============================================================================
 * Features:
 * 1. Live Client Search: Real-time filtering by name, email, phone, or scope
 * 2. Export to CSV: One-click Excel-compatible spreadsheet generation
 * 3. 15-Minute Inactivity Auto-Lock: Protects client inquiries when unattended
 * 4. Internal Admin Notes: Persistent per-inquiry notes saved to Supabase
 * 5. Mark All as Read batch action
 * 6. Pulsing beacon indicators for fresh unread queries
 * 7. 3-Factor Verification (Username + Registered Email + Password)
 * 8. RBAC, 15-Day Auto-Purge Recycle Bin & Audit Logs
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================================
     1. THEME SYNCHRONIZATION
     ========================================================================= */
  const themeToggleBtns = document.querySelectorAll('.admin-theme-toggle');
  const savedTheme = localStorage.getItem('dev_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('dev_portfolio_theme', targetTheme);
  };

  themeToggleBtns.forEach((btn) => btn.addEventListener('click', toggleTheme));

  /* =========================================================================
     2. MOUSE SPOTLIGHT, 3D TILT & RIPPLE PHYSICS
     ========================================================================= */
  window.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.glass-panel').forEach((panel) => {
      const rect = panel.getBoundingClientRect();
      panel.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      panel.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  }, { passive: true });

  const attachCardTilt = (elements) => {
    elements.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  };

  attachCardTilt(document.querySelectorAll('.stat-card, .modal-box'));

  const attachButtonRipples = () => {
    document.querySelectorAll('.btn, .btn-action, .filter-btn').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const circle = document.createElement('span');
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');

        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) existingRipple.remove();

        this.appendChild(circle);
      });
    });
  };

  attachButtonRipples();

  const adminScrollBar = document.getElementById('admin-scroll-bar');
  if (adminScrollBar) {
    window.addEventListener('scroll', () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      adminScrollBar.style.width = `${progress}%`;
    }, { passive: true });
  }

  /* =========================================================================
     3. ANIMATED NUMBER SCRAMBLER FOR STAT METRICS
     ========================================================================= */
  const animateMetricCounter = (element, targetValue) => {
    if (!element) return;
    const startValue = parseInt(element.textContent, 10) || 0;
    if (startValue === targetValue) {
      element.textContent = targetValue;
      return;
    }

    const duration = 500;
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuad);

      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = targetValue;
      }
    };

    requestAnimationFrame(updateNumber);
  };

  /* =========================================================================
     4. DATABASE KEYS & FALLBACK
     ========================================================================= */
  const SUPABASE_URL = 'https://nwvwrwwdtmejcqoanayv.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dndyd3dkdG1lamNxb2FuYXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjkyNDQsImV4cCI6MjEwNDU0NTI0NH0.hfDOvpxXzaPi80atyoXGX3P6boMmhrXXBPdMz7O5FxY';

  const headers = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
  };

  const HARDCODED_FALLBACK = {
    "dev": {
      email: "devjethava267@gmail.com",
      pass: "2805",
      hash: "a0239b56f2f2541fa98a2872bc58d1565e3170e7e1f40d12e6d97c503b0c53cb",
      role: "superadmin"
    }
  };

  // DOM elements - Login & Request screens
  const loginModal = document.getElementById('login-modal');
  const loginScreenBox = document.getElementById('login-screen-box');
  const requestScreenBox = document.getElementById('request-screen-box');
  const toRequestScreenBtn = document.getElementById('to-request-screen-btn');
  const backToLoginScreenBtn = document.getElementById('back-to-login-screen-btn');

  const loginForm = document.getElementById('login-form');
  const adminUserInput = document.getElementById('admin-user');
  const adminEmailInput = document.getElementById('admin-email');
  const adminPassInput = document.getElementById('admin-pass');
  const loginError = document.getElementById('login-error');

  const requestAccessForm = document.getElementById('request-access-form');
  const reqUserInput = document.getElementById('req-user');
  const reqEmailInput = document.getElementById('req-email');
  const reqPassInput = document.getElementById('req-pass');
  const reqReasonInput = document.getElementById('req-reason');
  const submitRequestBtn = document.getElementById('submit-request-btn');
  const requestFeedback = document.getElementById('request-feedback');

  // DOM elements - Dashboard
  const dashboard = document.getElementById('dashboard-container');
  const logoutBtn = document.getElementById('logout-btn');
  const exitLinks = document.querySelectorAll('.exit-link');

  const dashboardTitle = document.getElementById('dashboard-title');
  const dashboardDesc = document.getElementById('dashboard-desc');
  const activeUserNameEl = document.getElementById('active-user-name');
  const activeUserRoleEl = document.getElementById('active-user-role');
  const activeUserEmailEl = document.getElementById('active-user-email');

  // Tabs, Search & Counters
  const manageRequestsNavBtn = document.getElementById('manage-requests-nav-btn');
  const manageAdminsNavBtn = document.getElementById('manage-admins-nav-btn');
  const logsNavBtn = document.getElementById('logs-nav-btn');
  const tabRequestsCountEl = document.getElementById('tab-requests-count');
  const querySearchInput = document.getElementById('query-search-input');
  const searchWrapContainer = document.getElementById('search-wrap-container');
  const exportCsvBtn = document.getElementById('export-csv-btn');
  const markAllReadBtn = document.getElementById('mark-all-read-btn');

  const totalCountEl = document.getElementById('total-count');
  const unreadCountEl = document.getElementById('unread-count');
  const readCountEl = document.getElementById('read-count');
  const trashCountEl = document.getElementById('trash-count');
  const tabTrashCountEl = document.getElementById('tab-trash-count');
  const emptyTrashBtn = document.getElementById('empty-trash-btn');

  // Containers
  const queriesListEl = document.getElementById('queries-list');
  const requestsContainer = document.getElementById('requests-container');
  const requestsTbody = document.getElementById('requests-tbody');
  const adminsContainer = document.getElementById('admins-container');
  const adminsTbody = document.getElementById('admins-tbody');
  const logsContainer = document.getElementById('logs-container');
  const logsTbody = document.getElementById('logs-tbody');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Create Admin Form
  const createAdminForm = document.getElementById('create-admin-form');
  const newAdminUserInput = document.getElementById('new-admin-user');
  const newAdminEmailInput = document.getElementById('new-admin-email');
  const newAdminPassInput = document.getElementById('new-admin-pass');
  const newAdminRoleInput = document.getElementById('new-admin-role');
  const createAdminFeedback = document.getElementById('create-admin-feedback');

  let currentFilter = 'all';
  let searchQuery = '';
  let cachedQueries = [];
  let cachedRequests = [];
  let cachedAdmins = [];
  let cachedLogs = [];

  /* =========================================================================
     5. 15-MINUTE INACTIVITY AUTO-LOCK TIMEOUT
     ========================================================================= */
  let inactivityTimer = null;
  const INACTIVITY_LIMIT_MS = 15 * 60 * 1000; // 15 Minutes

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    if (sessionStorage.getItem('dev_admin_authorized') === 'true') {
      inactivityTimer = setTimeout(() => {
        alert('Session expired due to 15 minutes of inactivity. The dashboard has been locked.');
        performLogout();
        checkAuth();
      }, INACTIVITY_LIMIT_MS);
    }
  };

  ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach((event) => {
    window.addEventListener(event, resetInactivityTimer, { passive: true });
  });

  /* =========================================================================
     6. CRYPTOGRAPHIC HASH HELPER
     ========================================================================= */
  const computeHash = async (text) => {
    if (window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }
    return text;
  };

  /* =========================================================================
     7. ACTIVITY LOGGER HELPER
     ========================================================================= */
  const recordAdminLog = async (action, details = '') => {
    const username = sessionStorage.getItem('dev_admin_username') || 'admin';
    const role = sessionStorage.getItem('dev_admin_role') || 'superadmin';
    const loginTime = sessionStorage.getItem('dev_admin_login_time') || new Date().toISOString();

    const startMs = new Date(loginTime).getTime();
    const nowMs = Date.now();
    const elapsedMinutes = Math.max(0, Math.floor((nowMs - startMs) / 60000));
    const durationText = `${elapsedMinutes} min${elapsedMinutes === 1 ? '' : 's'}`;

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/admin_logs`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          username: username,
          role: role,
          action: action,
          details: details,
          logged_in_at: loginTime,
          session_duration: durationText
        })
      });
    } catch (err) {
      console.warn('Logging error:', err);
    }
  };

  /* =========================================================================
     8. AUTOMATIC LOGOUT & SESSION TRACKING
     ========================================================================= */
  const performLogout = () => {
    if (sessionStorage.getItem('dev_admin_authorized') === 'true') {
      recordAdminLog('Logged Out', 'Ended session');
    }
    clearTimeout(inactivityTimer);
    sessionStorage.removeItem('dev_admin_authorized');
    sessionStorage.removeItem('dev_admin_username');
    sessionStorage.removeItem('dev_admin_email');
    sessionStorage.removeItem('dev_admin_role');
    sessionStorage.removeItem('dev_admin_login_time');
  };

  exitLinks.forEach((link) => link.addEventListener('click', performLogout));
  window.addEventListener('beforeunload', performLogout);
  window.addEventListener('pagehide', performLogout);

  /* =========================================================================
     9. REQUEST ADMIN ACCESS FLOW
     ========================================================================= */
  if (toRequestScreenBtn) {
    toRequestScreenBtn.addEventListener('click', () => {
      loginScreenBox.style.display = 'none';
      requestScreenBox.style.display = 'block';
      loginError.textContent = '';
      requestFeedback.textContent = '';
    });
  }

  if (backToLoginScreenBtn) {
    backToLoginScreenBtn.addEventListener('click', () => {
      requestScreenBox.style.display = 'none';
      loginScreenBox.style.display = 'block';
      loginError.textContent = '';
      requestFeedback.textContent = '';
    });
  }

  if (requestAccessForm) {
    requestAccessForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = reqUserInput.value.trim().toLowerCase();
      const email = reqEmailInput.value.trim().toLowerCase();
      const rawPass = reqPassInput.value.trim();
      const reason = reqReasonInput.value.trim();

      if (!username || !email || !rawPass) return;

      submitRequestBtn.disabled = true;
      submitRequestBtn.textContent = 'Submitting Request...';

      try {
        const passHash = await computeHash(rawPass);

        const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_requests`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            username: username,
            email: email,
            password_hash: passHash,
            reason: reason,
            status: 'pending'
          })
        });

        if (res.ok) {
          requestFeedback.style.color = 'var(--accent-bright)';
          requestFeedback.textContent = 'Request submitted successfully! Once Superadmin approves your role, you can log in.';
          reqUserInput.value = '';
          reqEmailInput.value = '';
          reqPassInput.value = '';
          reqReasonInput.value = '';
        } else {
          requestFeedback.style.color = 'var(--color-error)';
          requestFeedback.textContent = 'Could not submit request. Username might already be requested or in use.';
        }
      } catch (err) {
        console.error(err);
        requestFeedback.style.color = 'var(--color-error)';
        requestFeedback.textContent = 'Network error. Please try again.';
      } finally {
        submitRequestBtn.disabled = false;
        submitRequestBtn.textContent = 'Submit Request';
      }
    });
  }

  /* =========================================================================
     10. AUTHENTICATION & LOGIN (3-FACTOR)
     ========================================================================= */
  const checkAuth = () => {
    const isAuthorized = sessionStorage.getItem('dev_admin_authorized') === 'true';
    if (isAuthorized) {
      loginModal.style.display = 'none';
      dashboard.style.display = 'block';

      const username = sessionStorage.getItem('dev_admin_username') || 'admin';
      const email = sessionStorage.getItem('dev_admin_email') || '';
      const role = sessionStorage.getItem('dev_admin_role') || 'superadmin';

      if (activeUserNameEl) activeUserNameEl.textContent = `@${username}`;
      if (activeUserRoleEl) activeUserRoleEl.textContent = role;
      if (activeUserEmailEl) activeUserEmailEl.textContent = email;

      if (role === 'superadmin') {
        if (manageRequestsNavBtn) manageRequestsNavBtn.style.display = 'inline-block';
        if (manageAdminsNavBtn) manageAdminsNavBtn.style.display = 'inline-block';
        if (logsNavBtn) logsNavBtn.style.display = 'inline-block';
        fetchPendingRequestsCount();
      } else {
        if (manageRequestsNavBtn) manageRequestsNavBtn.style.display = 'none';
        if (manageAdminsNavBtn) manageAdminsNavBtn.style.display = 'none';
        if (logsNavBtn) logsNavBtn.style.display = 'none';
      }

      resetInactivityTimer();
      cleanExpiredTrash().then(() => fetchQueries());
    } else {
      loginModal.style.display = 'flex';
      dashboard.style.display = 'none';
    }
  };

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const enteredUser = adminUserInput.value.trim().toLowerCase();
      const enteredEmail = adminEmailInput.value.trim().toLowerCase();
      const enteredPass = adminPassInput.value.trim();

      let accountFound = null;
      let isAuthorized = false;

      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/admin_users?username=eq.${enteredUser}&email=ilike.${enteredEmail}&select=*`,
          { method: 'GET', headers: headers }
        );
        const data = await res.json();
        
        if (data && data.length > 0) {
          accountFound = data[0];
          const hash = await computeHash(enteredPass);
          if (hash === accountFound.password_hash || enteredPass === accountFound.password_hash) {
            isAuthorized = true;
          }
        }
      } catch (err) {
        console.warn('Database query failed, checking fallback');
      }

      if (!isAuthorized && HARDCODED_FALLBACK[enteredUser]) {
        const fallback = HARDCODED_FALLBACK[enteredUser];
        if (fallback.email.toLowerCase() === enteredEmail) {
          const hash = await computeHash(enteredPass);
          if (hash === fallback.hash || enteredPass === fallback.pass) {
            accountFound = { username: enteredUser, email: fallback.email, role: fallback.role };
            isAuthorized = true;
          }
        }
      }

      if (isAuthorized && accountFound) {
        const loginTimestamp = new Date().toISOString();

        sessionStorage.setItem('dev_admin_authorized', 'true');
        sessionStorage.setItem('dev_admin_username', accountFound.username);
        sessionStorage.setItem('dev_admin_email', accountFound.email || enteredEmail);
        sessionStorage.setItem('dev_admin_role', accountFound.role);
        sessionStorage.setItem('dev_admin_login_time', loginTimestamp);

        await recordAdminLog('Logged In', `Email: ${enteredEmail} | Role: ${accountFound.role}`);

        loginError.textContent = '';
        adminUserInput.value = '';
        adminEmailInput.value = '';
        adminPassInput.value = '';
        checkAuth();
      } else {
        loginError.textContent = 'Access Denied: Username, email, or password incorrect';
        adminPassInput.value = '';
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      performLogout();
      checkAuth();
    });
  }

  /* =========================================================================
     11. 15-DAY AUTO PURGE ROUTINE
     ========================================================================= */
  const cleanExpiredTrash = async () => {
    try {
      const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString();
      await fetch(`${SUPABASE_URL}/rest/v1/queries?is_deleted=eq.true&deleted_at=lt.${fifteenDaysAgo}`, {
        method: 'DELETE',
        headers: headers
      });
    } catch (err) {
      console.warn('Auto-purge error:', err);
    }
  };

  /* =========================================================================
     12. DATA FETCHING
     ========================================================================= */
  const fetchQueries = async () => {
    queriesListEl.innerHTML = `<div class="empty-state"><p>Connecting to database feed...</p></div>`;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/queries?select=*&order=created_at.desc`, {
        method: 'GET',
        headers: headers
      });
      cachedQueries = await res.json();
      renderDashboard();
    } catch (err) {
      console.error(err);
      queriesListEl.innerHTML = `<div class="empty-state"><p>Error connecting to cloud database.</p></div>`;
    }
  };

  const fetchPendingRequestsCount = async () => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_requests?status=eq.pending&select=id`, {
        method: 'GET',
        headers: headers
      });
      const data = await res.json();
      if (tabRequestsCountEl) animateMetricCounter(tabRequestsCountEl, data.length);
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchRequests = async () => {
    requestsTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem;">Loading requests...</td></tr>`;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_requests?status=eq.pending&order=created_at.desc`, {
        method: 'GET',
        headers: headers
      });
      cachedRequests = await res.json();
      if (tabRequestsCountEl) animateMetricCounter(tabRequestsCountEl, cachedRequests.length);
      renderRequestsTable();
    } catch (err) {
      console.error(err);
      requestsTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--color-error); padding:2rem;">Failed to fetch requests.</td></tr>`;
    }
  };

  const fetchAdmins = async () => {
    adminsTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem;">Loading admins...</td></tr>`;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_users?select=*&order=created_at.desc`, {
        method: 'GET',
        headers: headers
      });
      cachedAdmins = await res.json();
      renderAdminsTable();
    } catch (err) {
      console.error(err);
      adminsTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--color-error); padding:2rem;">Failed to fetch admin accounts.</td></tr>`;
    }
  };

  const fetchLogs = async () => {
    logsTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem;">Loading audit trail...</td></tr>`;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_logs?select=*&order=created_at.desc&limit=100`, {
        method: 'GET',
        headers: headers
      });
      cachedLogs = await res.json();
      renderLogsTable();
    } catch (err) {
      console.error(err);
      logsTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--color-error); padding:2rem;">Failed to fetch activity logs.</td></tr>`;
    }
  };

  /* =========================================================================
     13. LIVE CLIENT SEARCH & CSV EXPORT
     ========================================================================= */
  if (querySearchInput) {
    querySearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderDashboard();
    });
  }

  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      const activeQueries = cachedQueries.filter(q => !q.is_deleted);
      if (activeQueries.length === 0) {
        alert('No client inquiries available to export.');
        return;
      }

      const headers = ['ID', 'Client Name', 'Email', 'Phone', 'Subject', 'Project Message', 'Admin Notes', 'Claimed By', 'Status', 'Received At'];
      const rows = activeQueries.map(q => [
        q.id,
        `"${(q.name || '').replace(/"/g, '""')}"`,
        `"${(q.email || '').replace(/"/g, '""')}"`,
        `"${(q.phone || '').replace(/"/g, '""')}"`,
        `"${(q.subject || '').replace(/"/g, '""')}"`,
        `"${(q.message || '').replace(/"/g, '""')}"`,
        `"${(q.admin_notes || '').replace(/"/g, '""')}"`,
        `"${(q.claimed_by || 'Unassigned').replace(/"/g, '""')}"`,
        q.is_read ? 'Read' : 'Unread',
        new Date(q.created_at).toLocaleString()
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `Client_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      recordAdminLog('Exported CSV', `Exported ${activeQueries.length} client leads to spreadsheet`);
    });
  }

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', async () => {
      const unreadItems = cachedQueries.filter(q => !q.is_read && !q.is_deleted);
      if (unreadItems.length === 0) {
        alert('All inquiries are already marked as read.');
        return;
      }

      if (!confirm(`Mark all ${unreadItems.length} unread inquiries as read?`)) return;

      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/queries?is_read=eq.false&is_deleted=eq.false`, {
          method: 'PATCH',
          headers: headers,
          body: JSON.stringify({ is_read: true })
        });

        if (res.ok) {
          cachedQueries.forEach(q => {
            if (!q.is_deleted) q.is_read = true;
          });
          renderDashboard();
          await recordAdminLog('Marked All Read', `Marked ${unreadItems.length} inquiries as read`);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  /* =========================================================================
     14. UPDATE INTERNAL ADMIN NOTES
     ========================================================================= */
  window.saveAdminNote = async (id, inputEl) => {
    const noteText = inputEl.value.trim();
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/queries?id=eq.${id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ admin_notes: noteText })
      });

      if (res.ok) {
        const item = cachedQueries.find(q => String(q.id) === String(id));
        if (item) item.admin_notes = noteText;
        inputEl.style.borderColor = 'var(--accent-primary)';
        setTimeout(() => { inputEl.style.borderColor = 'transparent'; }, 1000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================================================================
     15. RENDER PENDING REQUESTS VIEW
     ========================================================================= */
  const renderRequestsTable = () => {
    if (!cachedRequests || cachedRequests.length === 0) {
      requestsTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2.5rem; color:var(--text-muted);">No pending admin requests.</td></tr>`;
      return;
    }

    requestsTbody.innerHTML = cachedRequests.map(req => {
      return `
        <tr id="req-row-${req.id}">
          <td><strong style="color: var(--text-primary);">@${escapeHtml(req.username)}</strong></td>
          <td style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-bright);">${escapeHtml(req.email)}</td>
          <td>${new Date(req.created_at).toLocaleString()}</td>
          <td style="max-width: 200px; word-break: break-word;">${escapeHtml(req.reason || 'None provided')}</td>
          <td>
            <select class="role-select" id="role-select-${req.id}">
              <option value="viewer">Viewer (Read-only)</option>
              <option value="manager" selected>Manager (Operational)</option>
              <option value="superadmin">Superadmin (Full access)</option>
            </select>
          </td>
          <td>
            <button class="btn-action btn-approve" onclick="approveRequest('${req.id}')">
              ✓ Approve &amp; Assign Role
            </button>
            <button class="btn-action btn-delete" onclick="rejectRequest('${req.id}')">
              ✕ Reject
            </button>
          </td>
        </tr>
      `;
    }).join('');

    attachButtonRipples();
  };

  window.approveRequest = async (requestId) => {
    const req = cachedRequests.find(r => String(r.id) === String(requestId));
    if (!req) return;

    const roleSelect = document.getElementById(`role-select-${requestId}`);
    const chosenRole = roleSelect ? roleSelect.value : 'manager';

    try {
      const userRes = await fetch(`${SUPABASE_URL}/rest/v1/admin_users`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          username: req.username,
          email: req.email,
          password_hash: req.password_hash,
          role: chosenRole
        })
      });

      if (!userRes.ok) {
        alert('Could not approve request. Username or email may already exist in active admins.');
        return;
      }

      await fetch(`${SUPABASE_URL}/rest/v1/admin_requests?id=eq.${requestId}`, {
        method: 'DELETE',
        headers: headers
      });

      await recordAdminLog('Approved Admin Request', `Approved @${req.username} (${req.email}) as ${chosenRole}`);
      alert(`Admin @${req.username} has been approved as ${chosenRole}! They can now log in.`);
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert('Error approving request.');
    }
  };

  window.rejectRequest = async (requestId) => {
    const req = cachedRequests.find(r => String(r.id) === String(requestId));
    if (!req) return;

    if (!confirm(`Are you sure you want to reject the admin request from @${req.username}?`)) return;

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/admin_requests?id=eq.${requestId}`, {
        method: 'DELETE',
        headers: headers
      });

      await recordAdminLog('Rejected Admin Request', `Rejected request from @${req.username}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert('Error rejecting request.');
    }
  };

  /* =========================================================================
     16. RENDER MANAGE ADMINS VIEW
     ========================================================================= */
  const renderAdminsTable = () => {
    if (!cachedAdmins || cachedAdmins.length === 0) {
      adminsTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2.5rem; color:var(--text-muted);">No admin accounts found.</td></tr>`;
      return;
    }

    adminsTbody.innerHTML = cachedAdmins.map(admin => {
      const isRootDev = admin.username === 'dev';

      return `
        <tr>
          <td><strong style="color: var(--text-primary);">@${escapeHtml(admin.username)}</strong> ${isRootDev ? '⭐' : ''}</td>
          <td style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-bright);">${escapeHtml(admin.email || 'Not assigned')}</td>
          <td>
            <span class="log-badge ${admin.role === 'superadmin' ? 'login' : 'action'}">
              ${escapeHtml(admin.role)}
            </span>
          </td>
          <td>${new Date(admin.created_at).toLocaleDateString()}</td>
          <td>
            ${isRootDev ? '<span style="color:var(--text-muted); font-size:0.8rem;">Root Superadmin</span>' : `
              <select class="role-select" onchange="updateAdminRole('${admin.id}', this.value, '${escapeHtml(admin.username)}')">
                <option value="manager" ${admin.role === 'manager' ? 'selected' : ''}>Manager</option>
                <option value="viewer" ${admin.role === 'viewer' ? 'selected' : ''}>Viewer</option>
                <option value="superadmin" ${admin.role === 'superadmin' ? 'selected' : ''}>Superadmin</option>
              </select>
            `}
          </td>
          <td>
            <button class="btn-action" onclick="resetAdminPasswordPrompt('${admin.id}', '${escapeHtml(admin.username)}')" style="margin-right: 0.4rem;">
              🔑 Reset Pass
            </button>
            ${!isRootDev ? `
              <button class="btn-action btn-delete" onclick="deleteAdmin('${admin.id}', '${escapeHtml(admin.username)}')">
                ❌ Delete
              </button>
            ` : ''}
          </td>
        </tr>
      `;
    }).join('');

    attachButtonRipples();
  };

  if (createAdminForm) {
    createAdminForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = newAdminUserInput.value.trim().toLowerCase();
      const email = newAdminEmailInput.value.trim().toLowerCase();
      const rawPass = newAdminPassInput.value.trim();
      const role = newAdminRoleInput.value;

      if (!username || !email || !rawPass) return;

      if (username.length < 3) {
        createAdminFeedback.style.color = 'var(--color-error)';
        createAdminFeedback.textContent = 'Username must be at least 3 characters.';
        return;
      }

      try {
        const passHash = await computeHash(rawPass);
        const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_users`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            username: username,
            email: email,
            password_hash: passHash,
            role: role
          })
        });

        if (res.ok) {
          createAdminFeedback.style.color = 'var(--accent-bright)';
          createAdminFeedback.textContent = `Admin @${username} (${email}) created successfully!`;
          newAdminUserInput.value = '';
          newAdminEmailInput.value = '';
          newAdminPassInput.value = '';
          await recordAdminLog('Created Admin', `Created admin @${username} with email ${email} (${role})`);
          fetchAdmins();
        } else {
          createAdminFeedback.style.color = 'var(--color-error)';
          createAdminFeedback.textContent = 'Could not create admin. Username or email might already exist.';
        }
      } catch (err) {
        console.error(err);
        createAdminFeedback.style.color = 'var(--color-error)';
        createAdminFeedback.textContent = 'Error connecting to database.';
      }
    });
  }

  window.updateAdminRole = async (adminId, newRole, username) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_users?id=eq.${adminId}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ role: newRole })
      });

      if (res.ok) {
        await recordAdminLog('Updated Admin Role', `Changed @${username} role to ${newRole}`);
        fetchAdmins();
      }
    } catch (err) {
      console.error(err);
    }
  };

  window.resetAdminPasswordPrompt = async (adminId, username) => {
    const newPass = prompt(`Enter new password for admin @${username}:`);
    if (!newPass || newPass.trim() === '') return;

    try {
      const newHash = await computeHash(newPass.trim());
      const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_users?id=eq.${adminId}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ password_hash: newHash })
      });

      if (res.ok) {
        alert(`Password for @${username} updated successfully!`);
        await recordAdminLog('Reset Password', `Updated password for @${username}`);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update password.');
    }
  };

  window.deleteAdmin = async (adminId, username) => {
    if (!confirm(`Are you sure you want to permanently remove admin @${username}?`)) return;

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_users?id=eq.${adminId}`, {
        method: 'DELETE',
        headers: headers
      });

      if (res.ok) {
        await recordAdminLog('Deleted Admin', `Removed admin account @${username}`);
        fetchAdmins();
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete admin.');
    }
  };

  /* =========================================================================
     17. RENDER ACTIVITY LOGS TABLE
     ========================================================================= */
  const renderLogsTable = () => {
    if (!cachedLogs || cachedLogs.length === 0) {
      logsTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2.5rem; color:var(--text-muted);">No activity recorded yet.</td></tr>`;
      return;
    }

    logsTbody.innerHTML = cachedLogs.map(log => {
      let badgeClass = 'action';
      if (log.action.toLowerCase().includes('log')) badgeClass = 'login';
      if (log.action.toLowerCase().includes('trash') || log.action.toLowerCase().includes('delete')) badgeClass = 'trash';
      if (log.action.toLowerCase().includes('request')) badgeClass = 'pending';

      return `
        <tr>
          <td><strong style="color: var(--text-primary);">@${escapeHtml(log.username)}</strong></td>
          <td><span style="font-family: var(--font-mono); font-size: 0.78rem; text-transform: uppercase;">${escapeHtml(log.role)}</span></td>
          <td><span class="log-badge ${badgeClass}">${escapeHtml(log.action)}</span></td>
          <td>${escapeHtml(log.details || '—')}</td>
          <td>${new Date(log.logged_in_at).toLocaleString()}</td>
          <td style="font-family: var(--font-mono); color: var(--accent-bright); font-weight: 600;">${escapeHtml(log.session_duration)}</td>
        </tr>
      `;
    }).join('');
  };

  /* =========================================================================
     18. RENDER MAIN INQUIRY FEED & COUNTER UPDATES
     ========================================================================= */
  const renderDashboard = () => {
    const role = sessionStorage.getItem('dev_admin_role') || 'viewer';
    const currentUser = sessionStorage.getItem('dev_admin_username') || 'admin';

    if (searchWrapContainer) {
      searchWrapContainer.style.display = (currentFilter === 'admins' || currentFilter === 'logs') ? 'none' : 'block';
    }

    if (currentFilter === 'requests') {
      queriesListEl.style.display = 'none';
      adminsContainer.style.display = 'none';
      logsContainer.style.display = 'none';
      requestsContainer.style.display = 'block';
      emptyTrashBtn.style.display = 'none';
      dashboardTitle.textContent = 'Admin Access Requests';
      dashboardDesc.textContent = 'Review incoming requests and assign roles to grant dashboard access';
      fetchRequests();
      return;
    }

    if (currentFilter === 'admins') {
      queriesListEl.style.display = 'none';
      requestsContainer.style.display = 'none';
      logsContainer.style.display = 'none';
      adminsContainer.style.display = 'block';
      emptyTrashBtn.style.display = 'none';
      dashboardTitle.textContent = 'Admin Management';
      dashboardDesc.textContent = 'Add new admins, manage registered emails, or edit permissions';
      fetchAdmins();
      return;
    }

    if (currentFilter === 'logs') {
      queriesListEl.style.display = 'none';
      requestsContainer.style.display = 'none';
      adminsContainer.style.display = 'none';
      logsContainer.style.display = 'block';
      emptyTrashBtn.style.display = 'none';
      dashboardTitle.textContent = 'Admin Activity Logs';
      dashboardDesc.textContent = 'Complete audit trail of admin logins, session durations, and operations';
      fetchLogs();
      return;
    }

    queriesListEl.style.display = 'flex';
    requestsContainer.style.display = 'none';
    adminsContainer.style.display = 'none';
    logsContainer.style.display = 'none';
    dashboardTitle.textContent = 'Inquiry Management';
    dashboardDesc.textContent = 'Real-time inquiries stored in your Supabase database';

    const activeQueries = cachedQueries.filter(q => !q.is_deleted);
    const trashQueries = cachedQueries.filter(q => q.is_deleted);

    animateMetricCounter(totalCountEl, activeQueries.length);
    animateMetricCounter(unreadCountEl, activeQueries.filter(q => !q.is_read).length);
    animateMetricCounter(readCountEl, activeQueries.filter(q => q.is_read).length);
    animateMetricCounter(trashCountEl, trashQueries.length);
    if (tabTrashCountEl) animateMetricCounter(tabTrashCountEl, trashQueries.length);

    if (currentFilter === 'trash' && role === 'superadmin') {
      emptyTrashBtn.style.display = trashQueries.length > 0 ? 'inline-flex' : 'none';
    } else {
      emptyTrashBtn.style.display = 'none';
    }

    let filtered = [];
    if (currentFilter === 'all') filtered = activeQueries;
    if (currentFilter === 'unread') filtered = activeQueries.filter(q => !q.is_read);
    if (currentFilter === 'read') filtered = activeQueries.filter(q => q.is_read);
    if (currentFilter === 'trash') filtered = trashQueries;

    // Apply Live Search Filter
    if (searchQuery) {
      filtered = filtered.filter(q => 
        (q.name || '').toLowerCase().includes(searchQuery) ||
        (q.email || '').toLowerCase().includes(searchQuery) ||
        (q.phone || '').toLowerCase().includes(searchQuery) ||
        (q.subject || '').toLowerCase().includes(searchQuery) ||
        (q.message || '').toLowerCase().includes(searchQuery)
      );
    }

    if (filtered.length === 0) {
      queriesListEl.innerHTML = `
        <div class="empty-state">
          <h3>${searchQuery ? 'No matching inquiries found' : (currentFilter === 'trash' ? 'Recycle Bin is empty' : 'No inquiries available')}</h3>
          <p>${searchQuery ? 'Try clearing your search query.' : (currentFilter === 'trash' ? 'Deleted items stay here for 15 days before permanent removal.' : 'Submitted inquiries will display here automatically.')}</p>
        </div>
      `;
      return;
    }

    queriesListEl.innerHTML = filtered.map((q) => {
      const rawPhone = q.phone || '';
      const cleanPhone = rawPhone.replace(/[^\d+]/g, '');
      const waNumber = cleanPhone.startsWith('+') ? cleanPhone.slice(1) : (cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone);
      const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hi ' + q.name + ', I received your project inquiry regarding "' + q.subject + '".')}`;
      const gmailReplyUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(q.email)}&su=${encodeURIComponent('Re: ' + q.subject)}&body=${encodeURIComponent('Hi ' + q.name + ',\n\nThank you for reaching out via my portfolio!\n\n')}`;

      let daysRemainingText = '';
      if (q.is_deleted && q.deleted_at) {
        const deletedTime = new Date(q.deleted_at).getTime();
        const expiryTime = deletedTime + (15 * 24 * 60 * 60 * 1000);
        const diffDays = Math.max(0, Math.ceil((expiryTime - Date.now()) / (24 * 60 * 60 * 1000)));
        daysRemainingText = `<span class="trash-tag">Auto-deletes in ${diffDays} day${diffDays === 1 ? '' : 's'}</span>`;
      }

      const claimedBadge = q.claimed_by 
        ? `<span class="audit-claimed-tag">👤 Claimed by @${escapeHtml(q.claimed_by)}</span>` 
        : '';

      const deletedByBadge = (q.is_deleted && q.deleted_by)
        ? `<span class="audit-trash-by-tag">🗑️ Trashed by @${escapeHtml(q.deleted_by)}</span>`
        : '';

      return `
        <div class="query-card glass-panel ${q.is_deleted ? 'in-trash' : (q.is_read ? 'read' : 'unread')}" id="card-${q.id}">
          <div class="query-card-header">
            <div class="query-sender-info">
              <h3>${escapeHtml(q.name)}</h3>
              <div style="display: flex; gap: 0.8rem; align-items: center; flex-wrap: wrap; margin-top: 0.2rem;">
                <span class="query-email">${escapeHtml(q.email)}</span>
                ${rawPhone ? `<span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-bright);">📞 ${escapeHtml(rawPhone)}</span>` : ''}
              </div>
            </div>
            <div class="query-meta">
              ${q.is_deleted ? daysRemainingText : (!q.is_read ? '<span class="unread-indicator"><span class="unread-pulse-dot"></span> New Lead</span>' : '')}
              ${claimedBadge}
              ${deletedByBadge}
              <span class="query-date">${new Date(q.created_at).toLocaleString()}</span>
            </div>
          </div>

          <div class="query-subject">Subject: ${escapeHtml(q.subject)}</div>
          <div class="query-message">${escapeHtml(q.message)}</div>

          <!-- Internal Admin Notes Box -->
          <div class="admin-notes-box">
            <div class="admin-notes-header">
              <span class="admin-notes-label">📝 Internal Follow-up Notes (Auto-saves on enter)</span>
            </div>
            <input 
              type="text" 
              class="admin-notes-input" 
              placeholder="Add client notes (e.g. Quoted $500, waiting on design assets)..." 
              value="${escapeHtml(q.admin_notes || '')}" 
              onchange="saveAdminNote('${q.id}', this)"
            />
          </div>

          <div class="query-card-footer">
            ${q.is_deleted ? `
              ${role === 'superadmin' || role === 'manager' ? `
                <button class="btn-action btn-restore" onclick="restoreQuery('${q.id}', '${escapeHtml(q.name)}')">
                  ↩️ Restore to Inbox
                </button>
              ` : ''}

              ${role === 'superadmin' ? `
                <button class="btn-action btn-delete" onclick="permanentDeleteQuery('${q.id}', '${escapeHtml(q.name)}')">
                  ❌ Delete Permanently
                </button>
              ` : ''}
            ` : `
              ${role !== 'viewer' ? `
                <button class="btn-action" onclick="toggleReadStatus('${q.id}', ${q.is_read}, '${escapeHtml(q.name)}')">
                  ${q.is_read ? 'Mark as Unread' : 'Mark as Read'}
                </button>

                <button class="btn-action btn-claim" onclick="toggleClaimLead('${q.id}', '${q.claimed_by || ''}', '${escapeHtml(q.name)}')">
                  ${q.claimed_by === currentUser ? 'Release Claim' : (q.claimed_by ? 'Reassign to Me' : 'Claim Lead')}
                </button>
              ` : ''}
              
              <a class="btn-action btn-reply" href="${gmailReplyUrl}" target="_blank" rel="noopener noreferrer">
                Reply via Gmail
              </a>

              ${rawPhone ? `
                <a class="btn-action" style="background: rgba(37, 211, 102, 0.15); border-color: rgba(37, 211, 102, 0.4); color: #25D366;" href="${waLink}" target="_blank" rel="noopener noreferrer">
                  WhatsApp Client
                </a>
                <a class="btn-action" href="tel:${cleanPhone}">
                  Call
                </a>
              ` : ''}

              ${role === 'superadmin' || role === 'manager' ? `
                <button class="btn-action btn-delete" onclick="moveToTrash('${q.id}', '${escapeHtml(q.name)}')" title="Move to 15-day Recycle Bin">
                  🗑️ Move to Trash
                </button>
              ` : ''}
            `}
          </div>
        </div>
      `;
    }).join('');

    attachCardTilt(document.querySelectorAll('.query-card'));
    attachButtonRipples();
  };

  const escapeHtml = (unsafe) => {
    return (unsafe || '')
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  /* =========================================================================
     19. ACTIONS WITH AUDIT LOGGING
     ========================================================================= */
  window.toggleClaimLead = async (id, currentClaimant, clientName) => {
    const currentUser = sessionStorage.getItem('dev_admin_username') || 'admin';
    const newClaimant = currentClaimant === currentUser ? null : currentUser;

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/queries?id=eq.${id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ claimed_by: newClaimant })
      });

      if (res.ok) {
        const item = cachedQueries.find(q => String(q.id) === String(id));
        if (item) item.claimed_by = newClaimant;

        await recordAdminLog(
          newClaimant ? 'Claimed Lead' : 'Released Claim',
          `${newClaimant ? 'Assigned' : 'Unassigned'} inquiry from ${clientName}`
        );

        renderDashboard();
      }
    } catch (err) {
      console.error('Claim error:', err);
    }
  };

  window.moveToTrash = async (id, clientName) => {
    const currentUser = sessionStorage.getItem('dev_admin_username') || 'admin';
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/queries?id=eq.${id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({
          is_deleted: true,
          deleted_at: new Date().toISOString(),
          deleted_by: currentUser
        })
      });

      if (res.ok) {
        const item = cachedQueries.find(q => String(q.id) === String(id));
        if (item) {
          item.is_deleted = true;
          item.deleted_at = new Date().toISOString();
          item.deleted_by = currentUser;
        }

        await recordAdminLog('Moved to Trash', `Moved inquiry from ${clientName} to Recycle Bin`);
        renderDashboard();
      }
    } catch (err) {
      console.error('Error moving to trash:', err);
    }
  };

  window.restoreQuery = async (id, clientName) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/queries?id=eq.${id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({
          is_deleted: false,
          deleted_at: null,
          deleted_by: null
        })
      });

      if (res.ok) {
        const item = cachedQueries.find(q => String(q.id) === String(id));
        if (item) {
          item.is_deleted = false;
          item.deleted_at = null;
          item.deleted_by = null;
        }

        await recordAdminLog('Restored Inquiry', `Restored inquiry from ${clientName} back to active inbox`);
        renderDashboard();
      }
    } catch (err) {
      console.error('Error restoring query:', err);
    }
  };

  window.permanentDeleteQuery = async (id, clientName) => {
    if (!confirm('Permanently delete this inquiry? It cannot be recovered.')) return;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/queries?id=eq.${id}`, {
        method: 'DELETE',
        headers: headers
      });

      if (res.ok) {
        cachedQueries = cachedQueries.filter(q => String(q.id) !== String(id));
        await recordAdminLog('Permanent Delete', `Permanently erased inquiry from ${clientName}`);
        renderDashboard();
      }
    } catch (err) {
      console.error('Permanent delete error:', err);
    }
  };

  if (emptyTrashBtn) {
    emptyTrashBtn.addEventListener('click', async () => {
      if (!confirm('Are you sure you want to permanently empty the Recycle Bin?')) return;

      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/queries?is_deleted=eq.true`, {
          method: 'DELETE',
          headers: headers
        });

        if (res.ok) {
          cachedQueries = cachedQueries.filter(q => !q.is_deleted);
          await recordAdminLog('Emptied Recycle Bin', 'Purged all soft-deleted records');
          renderDashboard();
        }
      } catch (err) {
        console.error('Empty trash error:', err);
      }
    });
  }

  window.toggleReadStatus = async (id, currentStatus, clientName) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/queries?id=eq.${id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ is_read: !currentStatus })
      });

      if (res.ok) {
        const item = cachedQueries.find(q => String(q.id) === String(id));
        if (item) item.is_read = !currentStatus;

        await recordAdminLog(
          !currentStatus ? 'Marked as Read' : 'Marked as Unread',
          `Updated inquiry from ${clientName}`
        );

        renderDashboard();
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================================================================
     20. TAB NAVIGATION
     ========================================================================= */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderDashboard();
    });
  });

  checkAuth();
});