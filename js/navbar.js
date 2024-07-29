const toggleBtn = document.querySelector(".toggle-btn");
const navLinks = document.querySelector(".navlink");
const toggleBtnIcon = document.querySelector(".toggle-btn i");
let dropdownOpen = false;
let closeTimeout;

function showPage(pageId, element, isLogo = false) {
  const currentActivePageId = sessionStorage.getItem('activePage');

  // Check if the clicked link points to the current active page
  if (currentActivePageId === pageId) {
    return; // If it does, do nothing
  }

  const pages = document.querySelectorAll(".page");

  pages.forEach((page) => {
    page.style.opacity = 0;
    setTimeout(() => {
      page.style.display = "none";
      page.classList.remove("active");
    }, 500); // Match this timeout with the CSS transition duration
  });

  setTimeout(() => {
    const selectedPage = document.getElementById(pageId);
    selectedPage.style.display = "block";
    setTimeout(() => {
      selectedPage.style.opacity = 1;
      selectedPage.classList.add("active");
    }, 50); // Small delay to allow display change before opacity

    const navItems = document.querySelectorAll("nav ul li");
    navItems.forEach((item) => {
      item.classList.remove("active");
    });

    if (isLogo) {
      document.querySelector('#nav-home').classList.add('active');
    } else if (element) {
      element.parentElement.classList.add('active');
    }

    sessionStorage.setItem('activePage', pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 500); // Match this timeout with the CSS transition duration
}


function toggleDropdown(open) {
  if (open) {
    navLinks.classList.add('open');
    toggleBtnIcon.className = 'fa-solid fa-xmark';
    dropdownOpen = true;
  } else {
    navLinks.classList.remove('open');
    toggleBtnIcon.className = 'fa-solid fa-bars';
    dropdownOpen = false;
  }
}

toggleBtn.addEventListener('mouseover', () => {
  if (!dropdownOpen) {
    toggleDropdown(true);
  }
});

toggleBtn.addEventListener('mouseout', () => {
  closeTimeout = setTimeout(() => {
    toggleDropdown(false);
  }, 100);
});

navLinks.addEventListener('mouseover', () => {
  clearTimeout(closeTimeout);
  if (!dropdownOpen) {
    toggleDropdown(true);
  }
});

navLinks.addEventListener('mouseout', () => {
  closeTimeout = setTimeout(() => {
    toggleDropdown(false);
  }, 100);
});

document.addEventListener('click', (event) => {
  if (dropdownOpen) {
    const isClickInsideNav = navLinks.contains(event.target) || toggleBtn.contains(event.target);
    if (!isClickInsideNav) {
      toggleDropdown(false);
    }
  }
});

function navigateTo(pageId) {
  showPage(pageId);
  sessionStorage.removeItem('activePage');
}

function navigateToIndex(pageId) {
  sessionStorage.setItem("activePage", pageId);
  window.location.href = "index.htm";
}