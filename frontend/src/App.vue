<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const menuOpen = ref(false)
const isMobile = ref(false)

const contactForm = ref({
  company: '',
  email: '',
  region: '',
  phone: '',
  inquiryType: '',
  message: ''
})

const inquiryTypes = [
  { value: '', label: '선택하세요' },
  { value: 'product', label: '제품구매' },
  { value: 'delivery', label: '배송' },
  { value: 'exchange', label: '교환' },
  { value: 'rental', label: '렌탈' },
  { value: 'return', label: '반품' },
  { value: 'etc', label: '기타' }
]

function submitContact() {
  // TODO: API 연동
  console.log('Contact submit', contactForm.value)
}

function checkViewport() {
  isMobile.value = window.innerWidth < 768
  if (!isMobile.value) menuOpen.value = false
}

onMounted(() => {
  checkViewport()
  window.addEventListener('resize', checkViewport)
})

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <RouterLink to="/" class="title" @click="closeMenu">
        <img src="/logo.png" alt="IIPOS" class="title__logo" />
      </RouterLink>

      <!-- 모바일: 햄버거 + 드롭다운 -->
      <template v-if="isMobile">
        <button type="button" class="btn-menu" aria-label="메뉴" @click="toggleMenu">
          <span class="btn-menu__bar" />
          <span class="btn-menu__bar" />
          <span class="btn-menu__bar" />
        </button>
        <div v-if="menuOpen" class="nav-overlay" @click="closeMenu" />
        <nav class="nav nav--mobile" :class="{ 'nav--open': menuOpen }">
          <template v-if="authStore.isAuthenticated">
            <span class="user">{{ authStore.user?.userName }}님</span>
            <RouterLink to="/" @click="closeMenu">Home</RouterLink>
            <RouterLink to="/about" @click="closeMenu">About</RouterLink>
            <button type="button" class="btn-logout" @click="authStore.logout(); closeMenu()">로그아웃</button>
          </template>
          <template v-else>
            <RouterLink to="/login" @click="closeMenu">로그인</RouterLink>
            <RouterLink to="/register" @click="closeMenu">회원가입</RouterLink>
          </template>
        </nav>
      </template>

      <!-- PC: 가로 네비 -->
      <nav v-else class="nav nav--desktop">
        <div class="nav-desktop__left">
          <RouterLink to="/">매장장터</RouterLink>
          <RouterLink to="/about">기기장터</RouterLink>
          <RouterLink to="/about">동영상자료실</RouterLink>
          <RouterLink to="/about">문의하기</RouterLink>
        </div>
        <div class="nav-desktop__right">
          <template v-if="authStore.isAuthenticated">
            <span class="user">{{ authStore.user?.userName }}</span>
            <button type="button" class="btn-logout" @click="authStore.logout()">로그아웃</button>
          </template>
          <template v-else>
            <RouterLink to="/login">로그인</RouterLink>
            <RouterLink to="/register">회원가입</RouterLink>
          </template>
        </div>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  

  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__bottom">
        <p class="footer__copy">
          &copy; {{ new Date().getFullYear() }} IIPOS. All rights reserved.
        </p>
        <div class="footer__legal">
          <RouterLink to="/about">이용약관</RouterLink>
          <span class="footer__sep">|</span>
          <RouterLink to="/about">개인정보처리방침</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.header {
  line-height: 1.5;
  border-bottom: 1px solid var(--color-border);
  position: relative;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  max-width: 1280px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .wrapper {
    justify-content: flex-start;
    gap: 2rem;
    padding: 1rem 2rem;
  }
}

.title {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-text);
}

.title__logo {
  height: 32px;
  width: auto;
  display: block;
  object-fit: contain;
}

@media (min-width: 768px) {
  .title__logo {
    height: 36px;
  }
}

/* 모바일 햄버거 */
.btn-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 6px;
}

.btn-menu__bar {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-text);
  border-radius: 1px;
}

.nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.nav--mobile {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 180px;
  padding: 1rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
}

.nav--mobile.nav--open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav--mobile .user {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.9rem;
  color: var(--vt-c-text-2);
}

.nav--mobile a,
.nav--mobile .btn-logout {
  padding: 0.6rem 0.75rem;
  text-align: left;
  border-radius: 6px;
}

.nav--mobile .btn-logout {
  width: 100%;
  margin-top: 0.25rem;
}

/* PC 가로 네비 */
.nav--desktop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

.nav-desktop__left,
.nav-desktop__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-primary);
}

nav a {
  padding: 0 0.5rem;
  text-decoration: none;
  color: var(--color-text);
  font-size: 0.95rem;
}

.user {
  font-size: 0.9rem;
  color: var(--vt-c-text-2);
}

.btn-logout {
  padding: 0.35rem 0.75rem;
  font-size: 0.9rem;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-text);
}

/* Contact section (above footer) */
.contact-section {
  border-top: 1px solid var(--color-border);
  background: #f5f7ff;
}

.contact-section__wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .contact-section__wrapper {
    flex-direction: row;
    align-items: stretch;
    padding: 2rem;
    gap: 2rem;
  }
}

/* 좌측: 고객센터 카드 */
.contact-section__cs-card {
  flex-shrink: 0;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

@media (min-width: 768px) {
  .contact-section__cs-card {
    width: 280px;
    min-height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.contact-section__cs-title {
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-primary, hsla(160, 100%, 37%, 1));
}

.contact-section__cs-hours {
  margin: 0;
  font-size: 0.95rem;
  color: var(--vt-c-text-2, #666);
  line-height: 1.6;
}

.contact-section__cs-note {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  color: var(--vt-c-text-3, #999);
}

/* 우측: Contact Us 카드 */
.contact-section__form-card {
  flex: 1;
  min-width: 0;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

@media (min-width: 768px) {
  .contact-section__form-card {
    padding: 2rem;
  }
}

.contact-section__title {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-primary, hsla(160, 100%, 37%, 1));
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-form__row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-form__label {
  font-size: 0.875rem;
  color: var(--vt-c-text-2, #666);
}

.contact-form__input {
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background);
  color: var(--color-text);
}

.contact-form__input::placeholder {
  color: var(--vt-c-text-3, #999);
}

.contact-form__select {
  cursor: pointer;
  appearance: auto;
}

.contact-form__textarea {
  resize: vertical;
  min-height: 100px;
}

.contact-form__submit {
  margin-top: 0.5rem;
  padding: 0.6rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 500;
  background: var(--color-primary, hsla(160, 100%, 37%, 1));
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;
}

.contact-form__submit:hover {
  opacity: 0.9;
}


/* Footer */
.footer {
  margin-top: auto;
  border-top: 1px solid var(--color-border);
}

.footer__wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
}

@media (min-width: 768px) {
  .footer__wrapper {
    padding: 1rem 2rem;
  }
}

.footer__bottom {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--vt-c-text-2, #666);
}

@media (min-width: 768px) {
  .footer__bottom {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.footer__copy {
  margin: 0;
}

.footer__legal {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer__legal a {
  color: var(--vt-c-text-2, #666);
  text-decoration: none;
}

.footer__legal a:hover {
  color: var(--color-primary);
}

.footer__sep {
  color: var(--color-border);
  user-select: none;
}

:global(body) {
  background: #f5f6f8;
  
}
</style>
