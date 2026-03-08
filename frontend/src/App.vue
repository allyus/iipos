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
      <div class="footer__cols">
        <!-- 브랜드 -->
        <div class="footer__col footer__col--brand">
          <AppLogo class="footer__logo-wrap" />
          <p class="footer__tagline">포스 전문 거래 플랫폼</p>
          <p class="footer__desc">매장 창업·양도, 포스 기기 매매,<br>동영상 자료까지 한 곳에서.</p>
        </div>

        <!-- 서비스 -->
        <div class="footer__col">
          <p class="footer__col-title">서비스</p>
          <ul class="footer__list">
            <li><RouterLink to="/maejangter">매장장터</RouterLink></li>
            <li><RouterLink to="/gijangter">기기장터</RouterLink></li>
            <li><RouterLink to="/video-library">동영상자료실</RouterLink></li>
          </ul>
        </div>

        <!-- 고객지원 -->
        <div class="footer__col">
          <p class="footer__col-title">고객지원</p>
          <ul class="footer__list">
            <li><a href="#contact">문의하기</a></li>
          </ul>
        </div>

        <!-- 연락처 -->
        <div class="footer__col">
          <p class="footer__col-title">연락처</p>
          <ul class="footer__list footer__list--info">
            <li>
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              <span>02-1234-5678</span>
            </li>
            <li>
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              <span>help@iipos.co.kr</span>
            </li>
            <li>
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/></svg>
              <span>평일 09:00 – 18:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copy">&copy; {{ new Date().getFullYear() }} IIPOS. All rights reserved.</p>
        <nav class="footer__bottom-nav">
          <RouterLink to="/about">이용약관</RouterLink>
          <RouterLink to="/about">개인정보처리방침</RouterLink>
        </nav>
      </div>
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
  max-height: 180px;
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
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  background: #1a2236;
  color: rgba(255, 255, 255, 0.7);
}

.footer__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 1.5rem;
}

/* 컬럼 그리드 */
.footer__cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 1.5rem;
}

.footer__col--brand {
  grid-column: 1 / -1;
}

.footer__logo-wrap {
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

/* 푸터 다크 배경에서 로고 워드마크 색상 보정 */
.footer__logo-wrap :deep(.logo__pos) {
  color: #fff;
}

.footer__logo-wrap :deep(.logo__mark rect:first-child) {
  fill: #00b87a;
}

.footer__tagline {
  font-size: 0.78rem;
  font-weight: 600;
  color: #00b87a;
  margin: 0 0 0.4rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.footer__desc {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.6;
  margin: 0;
}

/* 컬럼 타이틀 */
.footer__col-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 0.75rem;
}

/* 링크 리스트 */
.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer__list a {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  transition: color 0.15s;
}

.footer__list a:hover {
  color: #00b87a;
}

/* 연락처 리스트 */
.footer__list--info li {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.55);
}

.footer__list--info svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  color: #00b87a;
}

/* 하단 바 */
.footer__bottom {
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer__copy {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  margin: 0;
}

.footer__bottom-nav {
  display: flex;
  gap: 1rem;
}

.footer__bottom-nav a {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  text-decoration: none;
  transition: color 0.15s;
}

.footer__bottom-nav a:hover {
  color: #00b87a;
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
    padding: 3rem 2rem 2rem;
  }

  .footer__cols {
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
  }

  .footer__col--brand {
    grid-column: auto;
  }

  .footer__bottom {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

:global(body) {
  background: #f1f5f9;
}
</style>
