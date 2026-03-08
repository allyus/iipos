<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ── 히어로 슬라이더 ──
const heroIndex = ref(0)
const HERO_COUNT = 3
let heroTimer: ReturnType<typeof setInterval> | null = null

function nextHero() {
  heroIndex.value = (heroIndex.value + 1) % HERO_COUNT
}

function prevHero() {
  heroIndex.value = (heroIndex.value - 1 + HERO_COUNT) % HERO_COUNT
}

function goHero(idx: number) {
  heroIndex.value = idx
}

// ── 상품 배너 가로 스크롤 ──
const productBannerRef = ref<HTMLElement | null>(null)
let scrollTimer: ReturnType<typeof setInterval> | null = null

function startScroll() {
  const el = productBannerRef.value
  if (!el) return
  if (scrollTimer) clearInterval(scrollTimer)
  scrollTimer = setInterval(() => {
    const el2 = productBannerRef.value
    if (!el2) return
    const max = el2.scrollWidth - el2.clientWidth
    if (el2.scrollLeft >= max) {
      el2.scrollLeft = 0
    } else {
      el2.scrollLeft += 1
    }
  }, 18)
}

function stopScroll() {
  if (scrollTimer) {
    clearInterval(scrollTimer)
    scrollTimer = null
  }
}

// ── 문의 폼 ──
const contactForm = ref({
  company: '',
  email: '',
  region: '',
  phone: '',
  message: '',
})

function submitContact() {
  console.log('Contact submit', contactForm.value)
}

onMounted(() => {
  heroTimer = setInterval(nextHero, 5000)
  startScroll()
})

onUnmounted(() => {
  if (heroTimer) clearInterval(heroTimer)
  stopScroll()
})
</script>

<template>
  <div class="home">

    <!-- ── 추천 상품 (가로 스크롤) ── -->
    <section class="product-banner" aria-label="추천 상품">
      <div class="product-banner__inner">
        <h2 class="section-title">추천 상품</h2>
        <div
          ref="productBannerRef"
          class="product-banner__track"
          @mouseenter="stopScroll"
          @mouseleave="startScroll"
          @touchstart="stopScroll"
          @touchend="startScroll"
        >
          <article class="product-card">
            <img class="product-card__img" src="/banner/1512$1$손오공현금.png" alt="손오공현금" loading="lazy" />
            <span class="product-card__label">손오공현금</span>
          </article>
          <article class="product-card">
            <img class="product-card__img" src="/banner/1513$1$리그오브레전드4.png" alt="리그오브레전드4" loading="lazy" />
            <span class="product-card__label">리그오브레전드4</span>
          </article>
          <article class="product-card">
            <img class="product-card__img" src="/banner/1512$1$손오공현금.png" alt="손오공현금" loading="lazy" />
            <span class="product-card__label">손오공현금</span>
          </article>
          <article class="product-card">
            <img class="product-card__img" src="/banner/1513$1$리그오브레전드4.png" alt="리그오브레전드4" loading="lazy" />
            <span class="product-card__label">리그오브레전드4</span>
          </article>
          <article class="product-card">
            <img class="product-card__img" src="/banner/1512$1$손오공현금.png" alt="손오공현금" loading="lazy" />
            <span class="product-card__label">손오공현금</span>
          </article>
          <article class="product-card">
            <img class="product-card__img" src="/banner/1513$1$리그오브레전드4.png" alt="리그오브레전드4" loading="lazy" />
            <span class="product-card__label">리그오브레전드4</span>
          </article>
        </div>
      </div>
    </section>

    <!-- ── 바로가기 ── -->
    <section class="shortcuts">
      <ul class="shortcuts__list">

        <!-- 회원가입 -->
        <li>
          <router-link to="/register" class="shortcut">
            <span class="shortcut__icon-wrap shortcut__icon-wrap--blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="10" cy="8" r="4"/>
                <path d="M2 20c0-4 3.6-7 8-7"/>
                <path d="M19 15v6M16 18h6"/>
              </svg>
            </span>
            <span class="shortcut__label">회원가입</span>
          </router-link>
        </li>

        <!-- 매장장터 -->
        <li>
          <router-link to="/maejangter" class="shortcut">
            <span class="shortcut__icon-wrap shortcut__icon-wrap--green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <rect x="9" y="14" width="6" height="8" rx="1"/>
              </svg>
            </span>
            <span class="shortcut__label">매장장터</span>
          </router-link>
        </li>

        <!-- 기기장터 -->
        <li>
          <router-link to="/gijangter" class="shortcut">
            <span class="shortcut__icon-wrap shortcut__icon-wrap--purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="3" width="16" height="11" rx="2"/>
                <rect x="8" y="17" width="8" height="4" rx="1"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="9" y1="7" x2="9" y2="10"/>
                <line x1="12" y1="6" x2="12" y2="10"/>
                <line x1="15" y1="7" x2="15" y2="10"/>
              </svg>
            </span>
            <span class="shortcut__label">기기장터</span>
          </router-link>
        </li>

        <!-- 동영상자료실 -->
        <li>
          <router-link to="/video-library" class="shortcut">
            <span class="shortcut__icon-wrap shortcut__icon-wrap--orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="5" width="15" height="14" rx="2"/>
                <path d="M17 9l5-3v12l-5-3V9z"/>
              </svg>
            </span>
            <span class="shortcut__label">동영상자료실</span>
          </router-link>
        </li>

        <!-- 문의하기 -->
        <li>
          <a href="#contact" class="shortcut">
            <span class="shortcut__icon-wrap shortcut__icon-wrap--teal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <line x1="9" y1="10" x2="15" y2="10"/>
                <line x1="9" y1="14" x2="13" y2="14"/>
              </svg>
            </span>
            <span class="shortcut__label">문의하기</span>
          </a>
        </li>

      </ul>
    </section>

    <div class="page-body">

      <!-- ── 히어로 슬라이더 ── -->
      <section class="hero" aria-label="메인 배너">
        <div class="hero__viewport">
          <div
            class="hero__track"
            :style="{ transform: `translateX(-${heroIndex * 100}%)` }"
          >
            <div class="hero__slide hero__slide--1">
              <img src="/banner/1512$1$손오공현금.png" alt="손오공현금" class="hero__img" />
            </div>
            <div class="hero__slide hero__slide--2">
              <img src="/banner/1513$1$리그오브레전드4.png" alt="리그오브레전드4" class="hero__img" />
            </div>
            <div class="hero__slide hero__slide--3">
              <img src="/banner/1512$1$손오공현금.png" alt="손오공현금" class="hero__img" />
            </div>
          </div>
        </div>

        <!-- 좌우 버튼 -->
        <button class="hero__btn hero__btn--prev" aria-label="이전" @click="prevHero">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button class="hero__btn hero__btn--next" aria-label="다음" @click="nextHero">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        <!-- 인디케이터 -->
        <div class="hero__dots">
          <button
            v-for="i in HERO_COUNT"
            :key="i"
            class="hero__dot"
            :class="{ 'hero__dot--active': heroIndex === i - 1 }"
            :aria-label="`슬라이드 ${i}`"
            @click="goHero(i - 1)"
          />
        </div>
      </section>

      <!-- ── 자료 다운로드 ── -->
      <section class="download-section" aria-label="자료 다운로드">
        <h2 class="section-title">자료 다운로드</h2>
        <div class="download-grid">
          <article class="download-card">
            <div class="download-card__icon">📥</div>
            <div class="download-card__body">
              <h3 class="download-card__title">IIPOS 설치 안내서</h3>
              <p class="download-card__desc">초기 설치 및 환경 설정 가이드입니다.</p>
              <button type="button" class="download-card__btn">다운로드</button>
            </div>
          </article>
          <article class="download-card">
            <div class="download-card__icon">📥</div>
            <div class="download-card__body">
              <h3 class="download-card__title">사용자 매뉴얼</h3>
              <p class="download-card__desc">일반 사용자를 위한 기본 기능 안내입니다.</p>
              <button type="button" class="download-card__btn">다운로드</button>
            </div>
          </article>
          <article class="download-card">
            <div class="download-card__icon">📥</div>
            <div class="download-card__body">
              <h3 class="download-card__title">관리자 매뉴얼</h3>
              <p class="download-card__desc">관리자 전용 고급 설정과 관리 기능 설명서입니다.</p>
              <button type="button" class="download-card__btn">다운로드</button>
            </div>
          </article>
          <article class="download-card">
            <div class="download-card__icon">📥</div>
            <div class="download-card__body">
              <h3 class="download-card__title">자주 묻는 질문(FAQ)</h3>
              <p class="download-card__desc">자주 문의되는 사용 방법과 해결 방법 모음입니다.</p>
              <button type="button" class="download-card__btn">다운로드</button>
            </div>
          </article>
        </div>
      </section>

      <!-- ── 고객센터 & 문의 ── -->
      <section id="contact" class="contact-section" aria-label="고객센터 및 문의">
        <h2 class="section-title">고객센터 및 문의</h2>
        <div class="contact-row">

          <!-- CS Center -->
          <div class="cs-card">
            <h3 class="cs-card__title">CS Center</h3>
            <p class="cs-card__tel">📞 010-3122-1237</p>
            <p class="cs-card__hours">평일 10:00 ~ 17:00</p>
            <p class="cs-card__hours">점심 12:00 ~ 13:00</p>
            <p class="cs-card__note">주말 · 공휴일 휴무</p>
          </div>

          <!-- 문의 폼 -->
          <div class="form-card">
            <h3 class="form-card__title">Contact Us</h3>
            <form class="contact-form" @submit.prevent="submitContact">
              <div class="contact-form__row-2">
                <input
                  v-model="contactForm.company"
                  type="text"
                  class="contact-form__input"
                  placeholder="상호명 또는 담당자명"
                />
                <input
                  v-model="contactForm.email"
                  type="email"
                  class="contact-form__input"
                  placeholder="이메일"
                />
              </div>
              <div class="contact-form__row-2">
                <input
                  v-model="contactForm.region"
                  type="text"
                  class="contact-form__input"
                  placeholder="지역"
                />
                <input
                  v-model="contactForm.phone"
                  type="tel"
                  class="contact-form__input"
                  placeholder="연락처"
                />
              </div>
              <textarea
                v-model="contactForm.message"
                class="contact-form__input contact-form__textarea"
                rows="4"
                placeholder="문의 내용을 입력해 주세요."
              />
              <button type="submit" class="contact-form__submit">문의하기</button>
            </form>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

/* ── 히어로 (page-body 안에서 풀 너비 돌파) ── */
.hero {
  position: relative;
  overflow: hidden;
  background: #1a2236;
  margin-left: -1rem;
  margin-right: -1rem;
  width: calc(100% + 2rem);
  margin-bottom: 0;
}

.hero__viewport {
  width: 100%;
  overflow: hidden;
  aspect-ratio: 2.5 / 1;
}

.hero__track {
  display: flex;
  height: 100%;
  transition: transform 0.45s ease;
}

.hero__slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 좌우 버튼 */
.hero__btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.15s;
  z-index: 10;
}

.hero__btn:hover {
  background: #fff;
}

.hero__btn svg {
  width: 18px;
  height: 18px;
}

.hero__btn--prev {
  left: 0.75rem;
}

.hero__btn--next {
  right: 0.75rem;
}

/* 인디케이터 */
.hero__dots {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.4rem;
}

.hero__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, transform 0.2s;
}

.hero__dot--active {
  background: #fff;
  transform: scale(1.3);
}

/* ── 바로가기 ── */
.shortcuts {
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.shortcuts__list {
  list-style: none;
  padding: 0.875rem 1rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  max-width: 1280px;
}

.shortcut {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  padding: 0.875rem 0.25rem;
  text-decoration: none;
  color: #374151;
  border-radius: 14px;
  transition: background 0.18s, transform 0.18s;
}

.shortcut:hover {
  background: rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

/* 아이콘 래퍼 (컬러 원형 배경) */
.shortcut__icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: box-shadow 0.18s;
}

.shortcut__icon-wrap svg {
  width: 24px;
  height: 24px;
}

.shortcut:hover .shortcut__icon-wrap {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

/* 컬러 테마 */
.shortcut__icon-wrap--blue {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  color: #fff;
}

.shortcut__icon-wrap--green {
  background: linear-gradient(135deg, #34d399, #00b87a);
  color: #fff;
}

.shortcut__icon-wrap--purple {
  background: linear-gradient(135deg, #a78bfa, #7c3aed);
  color: #fff;
}

.shortcut__icon-wrap--orange {
  background: linear-gradient(135deg, #fb923c, #ea580c);
  color: #fff;
}

.shortcut__icon-wrap--teal {
  background: linear-gradient(135deg, #2dd4bf, #0d9488);
  color: #fff;
}

.shortcut__label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #374151;
  text-align: center;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

/* ── 페이지 본문 ── */
.page-body {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.section-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a2236;
  margin: 0 0 0.875rem;
  letter-spacing: -0.02em;
}

/* ── 상품 배너 (최상단, 풀 너비) ── */
.product-banner {
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.product-banner__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.25rem 1rem 1rem;
}

.product-banner__track {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 0.5rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.product-banner__track::-webkit-scrollbar {
  display: none;
}

.product-card {
  flex: 0 0 auto;
  width: 160px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.07);
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.09);
}

.product-card__img {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.product-card__label {
  display: block;
  padding: 0.4rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
  text-align: center;
  background: #fff;
}

/* ── 자료 다운로드 ── */
.download-section {
  padding: 1.75rem 0 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.download-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.download-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.download-card__icon {
  font-size: 1.4rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.download-card__body {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.download-card__title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a2236;
  margin: 0;
}

.download-card__desc {
  font-size: 0.75rem;
  color: rgba(60, 60, 60, 0.55);
  margin: 0;
  line-height: 1.4;
}

.download-card__btn {
  margin-top: 0.4rem;
  align-self: flex-start;
  padding: 0.3rem 0.7rem;
  border: none;
  border-radius: 20px;
  background: #00b87a;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.download-card__btn:hover {
  background: #00a06a;
}

/* ── 문의 섹션 ── */
.contact-section {
  padding: 1.75rem 0 0;
}

.contact-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cs-card {
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.cs-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a2236;
  margin: 0 0 0.875rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #00b87a;
  display: inline-block;
}

.cs-card__tel {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a2236;
  margin: 0 0 0.5rem;
}

.cs-card__hours {
  font-size: 0.88rem;
  color: rgba(60, 60, 60, 0.7);
  margin: 0 0 0.2rem;
}

.cs-card__note {
  margin: 0.5rem 0 0;
  font-size: 0.82rem;
  color: rgba(60, 60, 60, 0.45);
}

.form-card {
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.form-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a2236;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #00b87a;
  display: inline-block;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-form__row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.contact-form__input {
  width: 100%;
  padding: 0.6rem 0.875rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-size: 0.875rem;
  background: #f8f9fc;
  color: #1a2236;
  transition: border-color 0.15s, background 0.15s;
  font-family: inherit;
}

.contact-form__input:focus {
  outline: none;
  border-color: #00b87a;
  background: #fff;
}

.contact-form__input::placeholder {
  color: rgba(60, 60, 60, 0.35);
}

.contact-form__textarea {
  resize: vertical;
  min-height: 100px;
}

.contact-form__submit {
  align-self: flex-start;
  padding: 0.65rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #00b87a;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  font-family: inherit;
}

.contact-form__submit:hover {
  background: #00a06a;
}

/* ── PC (768px+) ── */
@media (min-width: 768px) {
  /* 히어로: page-body 안에서 PC 패딩(2rem) 기준으로 풀 너비 돌파 */
  .hero {
    margin-left: -2rem;
    margin-right: -2rem;
    width: calc(100% + 4rem);
  }

  /* PC에서는 이미지 원본 비율 그대로 표시 (짤림 없음) */
  .hero__viewport {
    aspect-ratio: unset;
    height: auto;
  }

  .hero__track {
    height: auto;
    align-items: flex-start;
  }

  .hero__slide {
    height: auto;
  }

  .hero__img {
    height: auto;
    object-fit: unset;
  }

  .hero__btn {
    width: 44px;
    height: 44px;
  }

  .hero__btn--prev {
    left: 1.25rem;
  }

  .hero__btn--next {
    right: 1.25rem;
  }

  /* 추천상품 inner */
  .product-banner__inner {
    padding: 1.5rem 2rem 1.25rem;
  }

  .shortcuts__list {
    padding: 1.25rem 2rem;
    gap: 0.75rem;
  }

  .shortcut {
    padding: 1rem 0.5rem;
  }

  .shortcut__icon-wrap {
    width: 60px;
    height: 60px;
    border-radius: 18px;
  }

  .shortcut__icon-wrap svg {
    width: 28px;
    height: 28px;
  }

  .shortcut__label {
    font-size: 0.82rem;
  }

  .page-body {
    padding: 0 2rem 4rem;
  }

  .product-card {
    width: 200px;
  }

  .download-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .contact-row {
    flex-direction: row;
    align-items: flex-start;
  }

  .cs-card {
    width: 260px;
    flex-shrink: 0;
  }

  .form-card {
    flex: 1;
    min-width: 0;
  }

  .contact-form__row-2 {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .product-card {
    width: 220px;
  }
}
</style>
