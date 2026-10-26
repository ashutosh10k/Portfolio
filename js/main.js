/**
 * ASHUTOSH KUMAR — IT SUPPORT ENGINEER PORTFOLIO
 * High-Tech Interactive Engine & Terminal Emulator
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initCodeCopy();
  initTypewriter();
  initSkillsFilter();
  initIncidentSandbox();
  initInteractiveTerminal();
  initResumeModal();
  initContactForm();
  initQuickCopy();
  initAudioFeedback();
});

/* ===================================================================
   THEME TOGGLE
   =================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('ashutosh_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ashutosh_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme.toUpperCase()} theme mode`);
    playBeep(600, 0.08);
  });
}

function updateThemeIcon(theme) {
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  if (!sunIcon || !moonIcon) return;

  if (theme === 'light') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

/* ===================================================================
   NAVIGATION & ACTIVE SCROLL SPY
   =================================================================== */
function initNavigation() {
  const dockItems = document.querySelectorAll('.dock-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    dockItems.forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      if (href && href === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  });

  dockItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          playBeep(800, 0.05);
        }
      }
    });
  });
}

/* ===================================================================
   CODE EDITOR COPY BUTTON
   =================================================================== */
function initCodeCopy() {
  const copyBtn = document.getElementById('copy-code-btn');
  const codeContent = document.getElementById('code-content');
  if (!copyBtn || !codeContent) return;

  copyBtn.addEventListener('click', async () => {
    try {
      const textToCopy = codeContent.innerText;
      await navigator.clipboard.writeText(textToCopy);
      copyBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span style="color: #34d399">Copied!</span>
      `;
      showToast('TypeScript config copied to clipboard!');
      playBeep(950, 0.1);

      setTimeout(() => {
        copyBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <span>Copy</span>
        `;
      }, 2500);
    } catch (err) {
      showToast('Error copying to clipboard');
    }
  });
}

/* ===================================================================
   TYPEWRITER EFFECT IN HERO
   =================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const roles = [
    'IT Support Engineer',
    'Desktop & Systems Specialist',
    'L1/L2 Technical Support',
    'Network & Hardware Diagnostician',
    'MCA Post-Graduate (2024)'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2200; // Pause at end of word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ===================================================================
   SKILLS CATEGORY FILTER
   =================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      playBeep(520, 0.05);

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   INTERACTIVE IT INCIDENT SOLVER / DIAGNOSTICS SANDBOX
   =================================================================== */
const ticketData = {
  'TKT-1042': {
    id: 'TKT-1042',
    priority: 'HIGH PRIORITY',
    badgeClass: 'badge-high',
    title: 'DNS Resolution Failure & Default Gateway Unreachable',
    desc: 'Workstation user reports sudden loss of intranet access and inability to resolve domain hostnames. Ping tests to external 8.8.8.8 fail with transmit error.',
    logs: [
      { cmd: 'diag --inspect-adapter Ethernet0', text: 'Adapter active. IP: 192.168.1.145 / Subnet: 255.255.255.0' },
      { cmd: 'ping -n 2 192.168.1.1', text: 'Request timed out. Gateway ICMP blocked or ARP table invalid.' },
      { cmd: 'arp -d * && ipconfig /flushdns', text: 'ARP cache flushed. DNS resolver cache purged successfully.' },
      { cmd: 'ipconfig /release && ipconfig /renew', text: 'DHCP lease refreshed. Assigned IP: 192.168.1.108.' },
      { cmd: 'nslookup internal.corporate.local', text: 'Resolved to 192.168.1.250 via Primary DNS (192.168.1.5).' },
      { success: true, text: '✓ Incident Resolved: LAN routing and DNS cache restored. Network latency: 4ms.' }
    ]
  },
  'TKT-1043': {
    id: 'TKT-1043',
    priority: 'HIGH PRIORITY',
    badgeClass: 'badge-high',
    title: 'Windows BSOD Kernel Mode Trap / Storage Driver Conflict',
    desc: 'Finance department laptop experiences intermittent Blue Screen crashes (BugCheck 0x0000007E) following Windows 11 cumulative update 23H2.',
    logs: [
      { cmd: 'wevtutil qe System /q:"*[System[(Level=1 or Level=2)]]" /c:3', text: 'Critical Error: storahci.sys storage miniport crash at offset 0x12FA.' },
      { cmd: 'sfc /scannow', text: 'Scanning system integrity... Verification 100% complete. Corrupted payload detected.' },
      { cmd: 'dism /online /cleanup-image /restorehealth', text: 'Component store repaired from local WinSxS repository.' },
      { cmd: 'pnputil /restart-device "PCI\\VEN_8086&DEV_A352"', text: 'AHCI Controller restarted with signed generic storage driver.' },
      { success: true, text: '✓ Incident Resolved: BSOD halted. Dump analysis verified clean boot.' }
    ]
  },
  'TKT-1044': {
    id: 'TKT-1044',
    priority: 'MEDIUM PRIORITY',
    badgeClass: 'badge-med',
    title: 'Network Printer Spooler Freeze & 14 Pending Documents',
    desc: 'Shared floor laser printer queue hung. Multiple user print requests stuck in "Deleting..." state, locking the Windows Print Spooler service.',
    logs: [
      { cmd: 'Get-Service spooler | Select Status', text: 'Service status: Paused / Unresponsive.' },
      { cmd: 'Stop-Service spooler -Force', text: 'Print spooler service killed successfully.' },
      { cmd: 'Remove-Item C:\\Windows\\System32\\spool\\PRINTERS\\*.* -Force', text: '14 corrupted .SHD and .SPL temporary queue jobs deleted.' },
      { cmd: 'Start-Service spooler', text: 'Print spooler service started in state: RUNNING.' },
      { cmd: 'Test-NetConnection 192.168.1.200 -Port 9100', text: 'Raw 9100 Port Open: True. Printer ready.' },
      { success: true, text: '✓ Incident Resolved: Printer print jobs cleared. Test page dispatched successfully.' }
    ]
  },
  'TKT-1045': {
    id: 'TKT-1045',
    priority: 'MEDIUM PRIORITY',
    badgeClass: 'badge-med',
    title: 'Outlook MAPI Synchronization Halt & Profile Lock',
    desc: 'Executive assistant cannot send/receive emails. Outlook displays "Disconnected" and password prompt repeatedly prompts despite valid Active Directory credentials.',
    logs: [
      { cmd: 'taskkill /F /IM OUTLOOK.EXE', text: 'Outlook hung process terminated.' },
      { cmd: 'cmdkey /list | findstr MicrosoftOffice', text: 'Cached token expired in Windows Credential Manager.' },
      { cmd: 'cmdkey /delete:MicrosoftOffice16_Data:ADAL:*', text: 'Stale OAuth credentials removed.' },
      { cmd: 'outlook.exe /cleanreminders /safe:0', text: 'Exchange Web Services autodiscover handshake successful.' },
      { success: true, text: '✓ Incident Resolved: MAPI connection healthy. 42 unread messages synced.' }
    ]
  }
};

function initIncidentSandbox() {
  const ticketTabs = document.querySelectorAll('.ticket-tab-btn');
  const badgeEl = document.getElementById('ticket-priority-badge');
  const titleEl = document.getElementById('ticket-title');
  const descEl = document.getElementById('ticket-desc');
  const solveBtn = document.getElementById('btn-solve-ticket');
  const consolePane = document.getElementById('ticket-console');

  if (!ticketTabs.length || !solveBtn) return;

  let currentTicketId = 'TKT-1042';

  ticketTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      ticketTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      currentTicketId = tab.getAttribute('data-ticket');
      const data = ticketData[currentTicketId];

      badgeEl.className = `ticket-meta-badge ${data.badgeClass}`;
      badgeEl.textContent = data.priority;
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;

      consolePane.innerHTML = `
        <div class="console-log-line">
          <span class="log-time">[${getCurrentTime()}]</span>
          <span class="log-cmd">standby:</span>
          <span>Awaiting engineer diagnostic execution for ${data.id}...</span>
        </div>
      `;
      solveBtn.disabled = false;
      solveBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        <span>Run Diagnostics & Solve</span>
      `;
      playBeep(450, 0.05);
    });
  });

  solveBtn.addEventListener('click', () => {
    solveBtn.disabled = true;
    solveBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
      <span>Troubleshooting...</span>
    `;

    consolePane.innerHTML = '';
    const logs = ticketData[currentTicketId].logs;
    let step = 0;

    function runStep() {
      if (step < logs.length) {
        const item = logs[step];
        const line = document.createElement('div');
        line.className = 'console-log-line';

        if (item.success) {
          line.innerHTML = `<span class="log-time">[${getCurrentTime()}]</span> <span class="log-success">${item.text}</span>`;
          playBeep(1000, 0.15);
        } else {
          line.innerHTML = `<span class="log-time">[${getCurrentTime()}]</span> <span class="log-cmd">> ${item.cmd}</span><br><span style="padding-left:14px; color:#cbd5e1">${item.text}</span>`;
          playBeep(700 + step * 50, 0.04);
        }

        consolePane.appendChild(line);
        consolePane.scrollTop = consolePane.scrollHeight;
        step++;
        setTimeout(runStep, 650);
      } else {
        solveBtn.disabled = false;
        solveBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Resolved</span>
        `;
        showToast(`${currentTicketId} resolved with 100% success!`);
      }
    }

    runStep();
  });
}

function getCurrentTime() {
  const d = new Date();
  return d.toTimeString().split(' ')[0];
}

/* ===================================================================
   INTERACTIVE FULL-FEATURED CLI TERMINAL
   =================================================================== */
function initInteractiveTerminal() {
  const termInput = document.getElementById('terminal-input');
  const termOutput = document.getElementById('terminal-output');
  const chipBtns = document.querySelectorAll('.cmd-chip');
  if (!termInput || !termOutput) return;

  const history = [];
  let historyIdx = -1;

  const commands = {
    help: () => `
Available Commands:
  <span class="log-cmd">about</span>       - Print Ashutosh's background & career focus
  <span class="log-cmd">skills</span>      - List core IT support & systems capabilities
  <span class="log-cmd">exp</span>         - Display professional experience timeline
  <span class="log-cmd">edu</span>         - Show MCA / BCA academic credentials
  <span class="log-cmd">resume</span>      - View & download Ashutosh's official resume
  <span class="log-cmd">contact</span>     - Display phone, email, location & socials
  <span class="log-cmd">systeminfo</span>  - Output host diagnostics & environment
  <span class="log-cmd">ping [ip]</span>    - Test network latency to host
  <span class="log-cmd">matrix</span>      - Toggle Cyberpunk Matrix digital rain
  <span class="log-cmd">sudo hire</span>   - Unlock Ashutosh for your technical team!
  <span class="log-cmd">clear</span>       - Clear terminal buffer
    `,
    about: () => `
<span class="log-success">ASHUTOSH KUMAR — IT SUPPORT ENGINEER</span>
• <strong>Degree:</strong> Master of Computer Applications (MCA 2024, RCET Bhilai)
• <strong>Location:</strong> Sheikhpura, Bihar, India
• <strong>Specialization:</strong> Hardware/Software Diagnostics, Windows OS Setup, LAN Troubleshooting, User L1/L2 Support
• <strong>Approach:</strong> Detail-oriented, fast-learning, structured incident management.
    `,
    skills: () => `
<span class="log-success">TECHNICAL SKILLS MATRIX:</span>
[1] <strong>Operating Systems:</strong> Windows 10/11, Desktop Applications, Registry, System Maintenance
[2] <strong>Networking:</strong> Basic LAN, Connectivity Checks, TCP/IP, DNS/DHCP, Wi-Fi Configuration
[3] <strong>Hardware:</strong> Desktop/Laptop Assembly, Diagnostics, Peripheral Setup & Repair
[4] <strong>L1/L2 Support:</strong> Incident Ticketing, User Assistance, Remote & On-site Support
[5] <strong>Productivity:</strong> Microsoft Office Suite, Google Docs, Canva, Figma, Documentation
    `,
    exp: () => `
<span class="log-success">PROFESSIONAL WORK EXPERIENCE:</span>
1. <strong>Railworld India Pvt. Ltd. (Raipur)</strong>
   Role: Web Designer / Technical Support Exposure
   - Website-related & day-to-day tech support, file handling, coordination.
2. <strong>Nexzono Enterprises</strong>
   Role: Graphic Designer / Technical Support Exposure
   - Design tools, system usage, troubleshooting, computer operations.
3. <strong>Maa Narmada Sheela Professional Computer Institute</strong>
   Role: Computer Operator
   - Computer operations, documentation, data entry, user assistance.
    `,
    edu: () => `
<span class="log-success">ACADEMIC BACKGROUND:</span>
• <strong>Master of Computer Applications (MCA)</strong> [2024]
  Rungta College of Engineering & Technology (RCET), Bhilai
• <strong>Bachelor of Computer Applications (BCA)</strong> [2019]
  Magadh University
• <strong>ADCA</strong> (Advanced Diploma in Computer Application)
    `,
    resume: () => {
      openResumeModal();
      return `<span class="log-success">✓ Launching full resume preview and download modal...</span>`;
    },
    contact: () => `
<span class="log-success">GET IN TOUCH WITH ASHUTOSH:</span>
• <strong>Phone:</strong> <a href="tel:+919142491242" style="color:#38bdf8">+91 9142491242</a>
• <strong>Email:</strong> <a href="mailto:ashutoshurvil1999@gmail.com" style="color:#38bdf8">ashutoshurvil1999@gmail.com</a>
• <strong>WhatsApp:</strong> <a href="https://wa.me/919142491242" target="_blank" style="color:#34d399">+91 9142491242 (Chat)</a>
• <strong>Location:</strong> Sheikhpura, Bihar, India
    `,
    systeminfo: () => `
Host Name:            ASHUTOSH-IT-STATION
OS Name:              Microsoft Windows 11 Enterprise x64
System Manufacturer:  High-Performance IT Workstation
Processor:            Intel Core i7 / Multi-Thread Virtualized
Available Support:    L1 / L2 Technical & Network Operations
Current Status:       Ready For Interview & Immediate Joining
    `,
    clear: () => {
      termOutput.innerHTML = '';
      return null;
    },
    matrix: () => {
      toggleMatrixRain();
      return `<span class="log-success">⚡ Cyberpunk Matrix mode toggled! Look at the canvas background.</span>`;
    },
    'sudo hire': () => `
<span style="color:#34d399; font-size:1.1rem; font-weight:800">
🚀 CONGRATULATIONS! ACCESS GRANTED.
</span>
You made the best decision for your IT infrastructure.
Ashutosh Kumar is ready to join your team with strong technical problem solving, MCA pedigree, and hands-on operational grit.
<br><span style="color:#f59e0b">Next Step: Call +91 9142491242 or Email ashutoshurvil1999@gmail.com</span>
    `
  };

  function executeCommand(inputStr) {
    const trimmed = inputStr.trim();
    if (!trimmed) return;

    history.push(trimmed);
    historyIdx = history.length;

    // Echo input
    const echoLine = document.createElement('div');
    echoLine.innerHTML = `<span class="terminal-prompt">ashutosh@it-support:~$</span> <span>${escapeHtml(trimmed)}</span>`;
    termOutput.appendChild(echoLine);

    const lower = trimmed.toLowerCase();
    let result = '';

    if (commands[lower]) {
      result = commands[lower]();
    } else if (lower.startsWith('ping')) {
      const target = lower.split(' ')[1] || '8.8.8.8';
      result = `
Pinging ${escapeHtml(target)} with 32 bytes of data:
Reply from ${escapeHtml(target)}: bytes=32 time=8ms TTL=117
Reply from ${escapeHtml(target)}: bytes=32 time=7ms TTL=117
Reply from ${escapeHtml(target)}: bytes=32 time=9ms TTL=117
Ping statistics for ${escapeHtml(target)}:
    Packets: Sent = 3, Received = 3, Lost = 0 (0% loss)
      `;
    } else if (lower.startsWith('ipconfig')) {
      result = `
Windows IP Configuration
Ethernet adapter Local Area Network:
   Connection-specific DNS Suffix  . : domain.local
   IPv4 Address. . . . . . . . . . . : 192.168.1.108
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
      `;
    } else if (lower === 'whoami') {
      result = `guest@enterprise-network`;
    } else {
      result = `<span class="log-error">command not found: ${escapeHtml(trimmed)}</span>. Type <span class="log-cmd">help</span> for a list of available commands.`;
    }

    if (result !== null) {
      const respLine = document.createElement('div');
      respLine.innerHTML = result;
      termOutput.appendChild(respLine);
    }

    termInput.value = '';
    termOutput.scrollTop = termOutput.scrollHeight;
    playBeep(850, 0.04);
  }

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(termInput.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx > 0) {
        historyIdx--;
        termInput.value = history[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        historyIdx++;
        termInput.value = history[historyIdx];
      } else {
        historyIdx = history.length;
        termInput.value = '';
      }
    }
  });

  chipBtns.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        termInput.value = cmd;
        executeCommand(cmd);
      }
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ===================================================================
   RESUME MODAL & VIEWER
   =================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-modal-btn');
  const closeBtn = document.getElementById('close-resume-modal');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeResumeModal();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeResumeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeResumeModal();
    }
  });
}

function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    playBeep(650, 0.08);
  }
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

/* ===================================================================
   CONTACT FORM HANDLER
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !message) {
      showToast('Please fill out all required fields');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
      <span>Logging Ticket...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>Message Dispatched</span>
      `;
      showToast(`Thank you, ${name}! Your transmission has been received.`);
      playBeep(1100, 0.2);
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          <span>Send Transmission</span>
        `;
      }, 3000);
    }, 1200);
  });
}

/* ===================================================================
   QUICK CLIPBOARD COPY (EMAIL / PHONE)
   =================================================================== */
function initQuickCopy() {
  const copyBtns = document.querySelectorAll('.copy-mini-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const val = btn.getAttribute('data-copy');
      if (val) {
        try {
          await navigator.clipboard.writeText(val);
          showToast(`Copied ${val} to clipboard!`);
          playBeep(900, 0.08);
        } catch (err) {
          showToast('Failed to copy');
        }
      }
    });
  });
}

/* ===================================================================
   TOAST NOTIFICATION ENGINE
   =================================================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ===================================================================
   WEB AUDIO API FUTURISTIC SOUND EFFECTS
   =================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudioFeedback() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundBtn.style.color = soundEnabled ? 'var(--accent-amber)' : 'var(--text-muted)';
    showToast(soundEnabled ? 'Audio feedback: ENABLED' : 'Audio feedback: MUTED');
    if (soundEnabled) playBeep(750, 0.1);
  });
}

function playBeep(freq = 600, duration = 0.08) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio context may be restricted by browser policy before first interaction
  }
}

/* ===================================================================
   CYBERPUNK MATRIX DIGITAL RAIN (TOGGLED VIA TERMINAL "matrix")
   =================================================================== */
let matrixRunning = false;
let matrixCanvas = null;

function toggleMatrixRain() {
  if (matrixRunning) {
    if (matrixCanvas) matrixCanvas.remove();
    matrixRunning = false;
    return;
  }

  matrixCanvas = document.createElement('canvas');
  matrixCanvas.style.position = 'fixed';
  matrixCanvas.style.inset = '0';
  matrixCanvas.style.pointerEvents = 'none';
  matrixCanvas.style.zIndex = '1';
  matrixCanvas.style.opacity = '0.35';
  document.body.appendChild(matrixCanvas);

  const ctx = matrixCanvas.getContext('2d');
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;

  const chars = '0101010101ABCDEFITSUPPORTLANWANPINGDNSDHCPMCA2024';
  const fontSize = 14;
  const columns = Math.floor(matrixCanvas.width / fontSize);
  const drops = Array(columns).fill(1);

  matrixRunning = true;

  function draw() {
    if (!matrixRunning) return;
    ctx.fillStyle = 'rgba(8, 11, 17, 0.05)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    ctx.fillStyle = '#00f2fe';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    requestAnimationFrame(draw);
  }

  draw();
}
