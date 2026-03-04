<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const downloadItems = [
  {
    id: 1,
    title: 'IIPOS 설치 안내서',
    desc: '초기 설치 및 환경 설정 가이드입니다.',
  },
  {
    id: 2,
    title: '사용자 매뉴얼',
    desc: '일반 사용자를 위한 기본 기능 안내입니다.',
  },
  {
    id: 3,
    title: '관리자 매뉴얼',
    desc: '관리자 전용 고급 설정과 관리 기능 설명서입니다.',
  },
  {
    id: 4,
    title: '자주 묻는 질문(FAQ)',
    desc: '자주 문의되는 사용 방법과 해결 방법 모음입니다.',
  },
]

// 꽉찬 배너 슬라이더
const bannerIndex = ref(0)
const BANNER_COUNT = 3
let bannerTimer: ReturnType<typeof setInterval> | null = null

function nextBanner() {
  bannerIndex.value = (bannerIndex.value + 1) % BANNER_COUNT
}

function goToBanner(idx: number) {
  bannerIndex.value = idx
}

onMounted(() => {
  bannerTimer = setInterval(nextBanner, 5000)
})

onUnmounted(() => {
  if (bannerTimer) clearInterval(bannerTimer)
})
</script>

<template>
  <div class="home">
    <!-- PC 전용: 좌측 배너 (스크롤 시 함께 내려감) -->
    <aside class="left-banner" aria-label="좌측 배너">
      <div class="left-banner__inner">
        <div class="left-banner__item">
          <img src="/banner/start.jpg" alt="시작하기" loading="lazy" />
        </div>
        <div class="left-banner__item">
          <img src="/banner/start.jpg" alt="시작하기" loading="lazy" />
        </div>
        <div class="left-banner__item">
          <img src="/banner/start.jpg" alt="시작하기" loading="lazy" />
        </div>
      </div>
    </aside>
    <div class="home__main">
    <!-- 꽉찬 배너 (모바일: 가로 슬라이더 / PC: 좌측 세로 180px) -->
 
    <!-- 좌→우 배너 (가로 스크롤) -->
    <section class="hero-banner" aria-label="메인 배너">
      <div class="banner-track">
        <article class="banner-item">
          <img
            class="banner-item__img"
            src="/banner/start.jpg"
            alt="바로 시작하기"
            loading="lazy"
          />
          <span class="banner-item__caption">시작하기</span>
        </article>
        <article class="banner-item">
          <img
            class="banner-item__img"
            src="/banner/start.jpg"
            alt="바로 시작하기"
            loading="lazy"
          />
          <span class="banner-item__caption">시작하기</span>
        </article>

        <article class="banner-item">
          <img
            class="banner-item__img"
            src="/banner/start.jpg"
            alt="바로 시작하기"
            loading="lazy"
          />
          <span class="banner-item__caption">시작하기</span>
        </article>

        <article class="banner-item">
          <img
            class="banner-item__img"
            src="/banner/start.jpg"
            alt="바로 시작하기"
            loading="lazy"
          />
          <span class="banner-item__caption">시작하기</span>
        </article>

        <article class="banner-item">
          <img
            class="banner-item__img"
            src="/banner/start.jpg"
            alt="바로 시작하기"
            loading="lazy"
          />
          <span class="banner-item__caption">시작하기</span>
        </article>

        <article class="banner-item">
          <img
            class="banner-item__img"
            src="/banner/start.jpg"
            alt="바로 시작하기"
            loading="lazy"
          />
          <span class="banner-item__caption">시작하기</span>
        </article>
        
      </div>
    </section>

    <section class="quick-actions">
      
      <ul class="action-list">
        <li>
          <router-link to="/about" class="action-link">
            <span class="action-link__icon">📝</span>
            <span class="action-link__label">회원가입</span>
          </router-link>
        </li>
        <li>
          <router-link to="/about" class="action-link">
            <span class="action-link__icon">🏪</span>
            <span class="action-link__label">매장장터</span>
          </router-link>
        </li>
        
        <li>
          <a href="#" class="action-link" @click.prevent>
            <span class="action-link__icon">📱</span>
            <span class="action-link__label">기기장터</span>
          </a>
        </li>
       
        <li>
          <a href="#" class="action-link" @click.prevent>
            <span class="action-link__icon">📹</span>
            <span class="action-link__label">동영상자료실</span>
          </a>
        </li>
        <li>
          <a href="#" class="action-link" @click.prevent>
            <span class="action-link__icon">💬</span>
            <span class="action-link__label">문의하기</span>
          </a>
        </li>
        <li>
          <a href="#" class="action-link" @click.prevent>
            <span class="action-link__icon">☎️</span>
            <span class="action-link__label">문의하기</span>
          </a>
        </li>
      </ul>
    </section>
    <section class="banner" aria-label="메인 배너 슬라이더">
      <div class="banner__viewport">
        <div
          class="banner__track"
          :style="{ '--banner-offset': `-${bannerIndex * 100}%` }"
        >
        <article class="banner__slide">
            <img
              class="banner__img"
              src="/banner/start.jpg"
              alt="바로 시작하기"
            />
          </article>
          <article class="banner__slide">
            <img
              class="banner__img"
              src="/banner/start.jpg"
              alt="바로 시작하기"
            />
          </article>
          <article class="banner__slide">
            <img
              class="banner__img"
              src="/banner/start.jpg"
              alt="바로 시작하기"
            />
          </article>
        </div>
      </div>
      <div class="banner__indicator">
        <span class="banner__counter">{{ bannerIndex + 1 }} / {{ BANNER_COUNT }}</span>
      </div>
    </section>


    <section class="download-section" aria-label="자료 다운로드">
      <div class="download-grid">
        <article
          v-for="item in downloadItems"
          :key="item.id"
          class="download-card"
        >
          <div class="download-card__icon" aria-hidden="true">
            ⬇️
          </div>
          <div class="download-card__body">
            <h3 class="download-card__title">
              {{ item.title }}
            </h3>
            <p class="download-card__desc">
              {{ item.desc }}
            </p>
            <button
              type="button"
              class="download-card__button"
            >
              <span class="download-card__button-icon">⬇</span>
              <span>Download</span>
            </button>
          </div>
        </article>
      </div>
    </section>
    

    <!-- PC 전용: 대시보드형 레이아웃 -->
    </div>

    <!-- PC 전용: 우측 배너 (스크롤 시 함께 내려감) -->
    <aside class="right-banner" aria-label="우측 배너">
      <div class="right-banner__inner">
        <div class="right-banner__item">
          <img src="/banner/start.jpg" alt="시작하기" loading="lazy" />
        </div>
        <div class="right-banner__item">
          <img src="/banner/start.jpg" alt="시작하기" loading="lazy" />
        </div>
        <div class="right-banner__item">
          <img src="/banner/start.jpg" alt="시작하기" loading="lazy" />
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
/* 공통 */
.home {
  width: 100%;
  min-height: 60vh;
}

.home__main {
  width: 100%;
  min-width: 0;
}

/* PC 전용 좌/우 배너: 모바일에서는 숨김 */
.left-banner,
.right-banner {
  display: none;
}

.left-banner__inner,
.right-banner__inner {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.left-banner__item,
.right-banner__item {
  width: 100%;
  overflow: hidden;
  background: var(--color-background-mute);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.left-banner__item img,
.right-banner__item img {
  width: 100%;
  height: 40px;
  display: block;
  object-fit: cover;
  aspect-ratio: 1;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: 0 0 1rem;
}

.download-section {
  padding: 1.5rem 0 2rem;
}

.download-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.download-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.9rem 0.75rem;
  border-radius: 12px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.download-card__icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vt-c-indigo-soft);
  color: #fff;
  font-size: 1.2rem;
}

.download-card__body {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.download-card__title {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-heading);
}

.download-card__desc {
  margin: 0;
  font-size: 0.75rem;
  color: var(--vt-c-text-light-2);
  line-height: 1.4;
}

.download-card__button {
  margin-top: 0.35rem;
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  border: none;
  background: var(--vt-c-indigo);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
}

.download-card__button:hover {
  background: var(--vt-c-indigo-dark);
}

.download-card__button-icon {
  font-size: 0.9rem;
}

/* ----- 배너 (좌→우 3개) ----- */
.hero-banner {
  position: relative;
  width: calc(100% + 2rem);
  overflow: hidden;
  padding: 0.5rem 0 1.25rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox: 스크롤바 숨김 */
}

.hero-banner::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge: 스크롤바 숨김 */
}

.banner-track {
  display: flex;
  gap: 1rem;
  padding: 0.25rem 0.5rem;
  min-width: min-content;
}

.banner-item {
  flex: 0 0 auto;
  width: 170px;
  min-height: 180px;
  height: 180px;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  display: block;
  background: var(--color-background-mute);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.banner-item:active {
  transform: scale(0.98);
}

.banner-item__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner-item__caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.4rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
}

/* ----- 꽉찬 배너 (1/3 표시, 3초 롤링) ----- */
/* main 좌/우 padding만 배너만 예외로 full 너비 */
.banner {
  position: relative;
  margin: 0 -1rem 1.5rem;
  width: calc(100% + 2rem);
  border-radius: 0;
  overflow: hidden;
}

.banner__viewport {
  width: 100%;
  overflow: hidden;
  aspect-ratio: 4 / 1;
  max-height: 100px;
}

.banner__track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease-out;
  transform: translateX(var(--banner-offset, 0));
}

.banner__slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  min-width: 0;
}

.banner__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner__indicator {
  position: absolute;
  bottom: 0.75rem;
  left: auto;
  right: 0.4rem;
  display: flex;
  align-items: center;
  padding: 0;
}

.banner__counter {
  font-size: 0.55rem;
  font-weight: 400;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  padding: 0.1rem 0.3rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 3px;
}

/* ----- 모바일 우선 (768px 미만) ----- */
/* 모바일에서 보이는 순서: hero-banner → quick-actions → banner → download → dashboard */
.home {
  display: flex;
  flex-direction: column;
}

.hero-banner { order: 1; }
.quick-actions { order: 2; }
.banner { order: 3; }
.download-section { order: 4; }
.dashboard { order: 5; }

.quick-actions {
  padding: 0 0 2rem;
}

.action-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.25rem 0.5rem; /* 위·아래 줄 간격 넓힘 */
}

.action-list li {
  margin: 0;
  min-width: 0; /* 그리드 셀 내용이 넘치지 않도록 */
}

.action-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--color-text);
  text-decoration: none;
}

.action-link:hover {
  opacity: 0.85;
}

.action-link__icon {
  font-size: 2rem;
  line-height: 1;
}

.action-link__label {
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* 모바일에서 대시보드(사이드+메인) 숨김 */
.dashboard--desktop {
  display: none;
}

/* ----- PC (768px 이상) ----- */
@media (min-width: 768px) {
  .home {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 1.5rem;
    min-width: 0;
    box-sizing: border-box;
  }

  .home__main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* 좌/우 배너: PC에서만 표시, 스크롤 시 본문과 함께 내려감 */
  .left-banner,
  .right-banner {
    display: block;
    flex-shrink: 0;
    width: 180px;
    padding-top: 0.25rem;
  }

  .left-banner__item img,
  .right-banner__item img {
    aspect-ratio: 3 / 4;
  }

  /* 꽉찬 배너: PC에서는 숨김 (모바일 전용) */
  .banner {
    display: none;
  }

  /* hero-banner: PC에서 100% 너비로 모든 컨텐츠 한 줄에 표시 */
  .hero-banner {
    display: block;
    width: 100%;
    overflow: visible;
    padding: 0.5rem 0 1.25rem;
  }

  .hero-banner .banner-track {
    width: 100%;
    min-width: 0;
    flex-wrap: nowrap;
  }

  .hero-banner .banner-item {
    flex: 1 1 0;
    min-width: 0;
    width: auto;
  }

  .quick-actions {
    padding: 1rem 0 2rem;
  }

  .action-list {
    grid-template-columns: repeat(5, 1fr);
    gap: 1.25rem 1rem; /* 위·아래 줄 간격 넓힘 */
  }

  .action-link__icon {
    font-size: 2.25rem;
  }

  .action-link__label {
    font-size: 0.95rem;
  }

  /* PC에서 대시보드 표시 */
  .dashboard--desktop {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 2rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-border);
  }

  .dashboard__side {
    min-width: 0;
  }

  .side-card {
    padding: 1.25rem;
    background: var(--color-background-soft);
    border: 1px solid var(--color-border);
    border-radius: 12px;
  }

  .side-card h3 {
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0 0 1rem;
    color: var(--color-heading);
  }

  .summary-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .summary-list li {
    display: flex;
    justify-content: space-between;
    padding: 0.35rem 0;
    font-size: 0.9rem;
  }

  .summary-label {
    color: var(--vt-c-text-light-2);
  }

  .welcome-card {
    padding: 1.5rem;
    background: var(--color-background-soft);
    border: 1px solid var(--color-border);
    border-radius: 12px;
  }

  .welcome-card h2 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
  }

  .welcome-card p {
    font-size: 0.95rem;
    color: var(--vt-c-text-light-2);
    margin: 0;
    line-height: 1.5;
  }
}

</style>
