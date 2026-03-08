<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppLogo from '@/components/AppLogo.vue'

const authStore = useAuthStore()
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeMenu()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <RouterLink to="/" class="logo" @click="closeMenu">
        <AppLogo />
      </RouterLink>

      <!-- PC 네비 -->
      <nav class="nav-desktop">
        <RouterLink to="/maejangter" class="nav-link">매장장터</RouterLink>
        <RouterLink to="/gijangter" class="nav-link">기기장터</RouterLink>
        <RouterLink to="/video-library" class="nav-link">동영상자료실</RouterLink>
        <a href="#contact" class="nav-link">문의하기</a>
      </nav>

      <!-- PC 인증 -->
      <div class="nav-auth">
        <template v-if="authStore.isAuthenticated">
          <span class="auth-name">{{ authStore.user?.userName }}님</span>
          <button type="button" class="btn-outline" @click="authStore.logout()">로그아웃</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="btn-ghost">로그인</RouterLink>
          <RouterLink to="/register" class="btn-solid">회원가입</RouterLink>
        </template>
      </div>

      <!-- 모바일 햄버거 -->
      <button
        type="button"
        class="btn-hamburger"
        :class="{ 'is-open': menuOpen }"
        aria-label="메뉴"
        @click="toggleMenu"
      >
        <span /><span /><span />
      </button>
    </div>

    <!-- 모바일 드롭다운 -->
    <div class="mobile-menu" :class="{ 'is-open': menuOpen }">
      <nav class="mobile-menu__nav">
        <RouterLink to="/maejangter" class="mobile-link" @click="closeMenu">
          <span class="mobile-link__icon">🏪</span>매장장터
        </RouterLink>
        <RouterLink to="/gijangter" class="mobile-link" @click="closeMenu">
          <span class="mobile-link__icon">🕹️</span>기기장터
        </RouterLink>
        <RouterLink to="/video-library" class="mobile-link" @click="closeMenu">
          <span class="mobile-link__icon">📽️</span>동영상자료실
        </RouterLink>
        <a href="#contact" class="mobile-link" @click="closeMenu">
          <span class="mobile-link__icon">💬</span>문의하기
        </a>
      </nav>
      <div class="mobile-menu__auth">
        <template v-if="authStore.isAuthenticated">
          <p class="auth-name auth-name--mobile">{{ authStore.user?.userName }}님 환영합니다</p>
          <button type="button" class="btn-solid btn--block" @click="authStore.logout(); closeMenu()">로그아웃</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="btn-outline btn--block" @click="closeMenu">로그인</RouterLink>
          <RouterLink to="/register" class="btn-solid btn--block" @click="closeMenu">회원가입</RouterLink>
        </template>
      </div>
    </div>

    <div v-if="menuOpen" class="overlay" @click="closeMenu" />
  </header>

  <main>
    <RouterView />
  </main>

  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <AppLogo class="footer__logo-wrap" />
        <p class="footer__tagline">포스 전문 플랫폼</p>
      </div>
      <nav class="footer__nav">
        <RouterLink to="/about">이용약관</RouterLink>
        <RouterLink to="/about">개인정보처리방침</RouterLink>
      </nav>
      <p class="footer__copy">&copy; {{ new Date().getFullYear() }} IIPOS. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
/* ── 헤더 ── */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}

.header__inner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 58px;
}

/* 로고 */
.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 0.5rem;
  text-decoration: none;
}

/* PC 네비 */
.nav-desktop {
  display: none;
  align-items: center;
  gap: 0.125rem;
  flex: 1;
}

.nav-link {
  padding: 0.45rem 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  border-radius: 6px;
  transition: color 0.15s, background 0.15s;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #00b87a;
  background: rgba(0, 184, 122, 0.08);
}

/* PC 인증 영역 */
.nav-auth {
  display: none;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  flex-shrink: 0;
}

.auth-name {
  font-size: 0.85rem;
  color: rgba(60, 60, 60, 0.6);
}

.auth-name--mobile {
  font-size: 0.9rem;
  margin: 0;
}

/* 버튼 */
.btn-ghost {
  padding: 0.4rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  background: transparent;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s;
}

.btn-ghost:hover {
  color: #00b87a;
}

.btn-outline {
  padding: 0.4rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
  text-align: center;
}

.btn-outline:hover {
  border-color: #00b87a;
  color: #00b87a;
}

.btn-solid {
  padding: 0.4rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: #00b87a;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s;
  text-align: center;
}

.btn-solid:hover {
  background: #00a06a;
}

.btn--block {
  display: block;
  padding: 0.75rem;
}

/* 햄버거 */
.btn-hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 9px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  margin-left: auto;
  flex-shrink: 0;
}

.btn-hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #374151;
  border-radius: 1px;
  transition: transform 0.25s, opacity 0.2s;
}

.btn-hamburger.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.btn-hamburger.is-open span:nth-child(2) {
  opacity: 0;
}

.btn-hamburger.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* 모바일 드롭다운 */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  z-index: 90;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease;
}

.mobile-menu.is-open {
  max-height: 450px;
}

.mobile-menu__nav {
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.9rem 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: color 0.15s;
}

.mobile-link:last-child {
  border-bottom: none;
}

.mobile-link:hover,
.mobile-link.router-link-active {
  color: #00b87a;
}

.mobile-link__icon {
  font-size: 1.1rem;
  width: 24px;
  text-align: center;
}

.mobile-menu__auth {
  padding: 0.875rem 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 80;
}

/* ── 푸터 ── */
.footer {
  margin-top: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  background: #f8f9fc;
}

.footer__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer__logo-wrap {
  opacity: 0.65;
  transform: scale(0.82);
  transform-origin: left center;
}

.footer__tagline {
  font-size: 0.82rem;
  color: rgba(60, 60, 60, 0.5);
  margin: 0;
}

.footer__nav {
  display: flex;
  gap: 1rem;
}

.footer__nav a {
  font-size: 0.82rem;
  color: rgba(60, 60, 60, 0.5);
  text-decoration: none;
}

.footer__nav a:hover {
  color: #00b87a;
}

.footer__copy {
  font-size: 0.8rem;
  color: rgba(60, 60, 60, 0.4);
  margin: 0;
}

/* ── PC (768px+) ── */
@media (min-width: 768px) {
  .header__inner {
    padding: 0 2rem;
    height: 64px;
    gap: 0;
  }

  .nav-desktop {
    display: flex;
    margin-left: 1.5rem;
  }

  .nav-auth {
    display: flex;
  }

  .btn-hamburger,
  .mobile-menu {
    display: none;
  }

  .footer__inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

:global(body) {
  background: #f5f6f8;
}
</style>
