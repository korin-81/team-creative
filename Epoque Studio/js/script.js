// ヘッダーのパディング自動調整
// document.addEventListener("DOMContentLoaded", function () {
//   const header = document.querySelector(".header");
//   const wrapper = document.querySelector(".wrapper");

//   function adjustPadding() {
//     let headerHeight = header.offsetHeight; // 現在のヘッダーの高さを取得
//     wrapper.style.paddingTop = headerHeight + "px"; // その高さ分のパディングを設定
//   }

//   adjustPadding();
//   window.addEventListener("resize", adjustPadding); // ウィンドウサイズ変更時に再調整
// });

// ヘッダーの透明化
// const jsHeader = document.querySelector("#js-header");
// const fvSection = document.querySelector(".fv"); // .fvセクション
// const newsSection = document.querySelector(".news"); // .newsセクション

// window.addEventListener("scroll", () => {
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   const fvTop = fvSection.offsetTop;
//   const newsTop = newsSection.offsetTop;
//   const newsHeight = newsSection.offsetHeight;

//   // fvセクション内からnewsセクションが終わるまで透明化
//   if (scrollTop >= fvTop && scrollTop < newsTop + newsHeight) {
//     jsHeader.classList.add("is-scrolled");
//   } else {
//     jsHeader.classList.remove("is-scrolled");
//   }
// });

// ヘッダーの背景色変更
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const newsSection = document.querySelector("#news");
  const newsTop = newsSection.offsetTop;
  const headerFollow = document.querySelector(".header-follow");

  // newsセクションを超えたらis-showを付与
  if (scrollTop >= newsTop) {
    headerFollow.classList.add("is-show");
  } else {
    headerFollow.classList.remove("is-show");
  }
});

// FVのスライダー
const swiper = new Swiper(".fv-swiper", {
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
    type: "bullets",
    dynamicBullets: false,
    dynamicMainBullets: 6, // スライドの数に合わせて6に設定
  },
  loop: true, // 画像をループさせる

  // 自動再生の設定
  autoplay: {
    delay: 5000, // 5秒間隔
    disableOnInteraction: false, // ユーザー操作後も自動再生を継続
  },

  // スライドのエフェクト設定
  effect: "fade", // フェードエフェクトを使用
  fadeEffect: {
    crossFade: true, // クロスフェードを有効化
  },

  speed: 2000, // トランジション時間を2秒に設定

  // ページネーションの設定
  pagination: {
    el: ".swiper-pagination", // ページネーション要素のクラス
    clickable: true, // クリック可能にする
  },

  on: {
    click: function (swiper, event) {
      if (event.target.closest(".swiper-slide")) {
        swiper.slideNext();
      }
    },

    slideChange: function () {
      // 現在のスライドインデックスを取得
      const activeIndex = this.realIndex;

      // 白テキストが見えにくい範囲の時
      if (window.matchMedia("(max-width: 580px)").matches) {
        // 3枚目のスライドの時
        if (activeIndex === 2) {
          jQuery(".fv__lead").css("color", "#000"); // テキストの色を黒に
        } else {
          jQuery(".fv__lead").css("color", "#fff"); // テキストの色を白に
        }
      }
    },
  },
});

// コンセプトセクションのアニメーション
const conceptAnimation1 = document.querySelector(".concept-animation__item1");
const conceptAnimation2 = document.querySelector(".concept-animation__item2");
const conceptAnimation3 = document.querySelector(".concept-animation__item3");

// Intersection Observerの設定
const animationOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};

// 要素が画面に入ったときのコールバック
const animationCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-animated");
    }
  });
};

// Intersection Observerのインスタンスを作成
const animationObserver = new IntersectionObserver(
  animationCallback,
  animationOptions
);

// 監視を開始
if (conceptAnimation1) animationObserver.observe(conceptAnimation1);
if (conceptAnimation2) animationObserver.observe(conceptAnimation2);
if (conceptAnimation3) animationObserver.observe(conceptAnimation3);

jQuery("#js-drawer-icon").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-icon").toggleClass("is-checked");
  jQuery("#js-drawer-content").toggleClass("is-checked");
  jQuery("body").toggleClass("is-fixed");

  // ドロワーを開いたらアニメーションを発動
  if (jQuery("#js-drawer-content").hasClass("is-checked")) {
    jQuery(".drawer-animation__item").addClass("is-animated");
  } else {
    jQuery(".drawer-animation__item").removeClass("is-animated");
  }
});

// 内部リンククリックでドロワーを閉じる
jQuery("#js-drawer-content a[href^='#']").on("click", function (e) {
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");
  jQuery("body").removeClass("is-fixed");

  // アニメーションもリセット
  jQuery(".drawer-animation__item").removeClass("is-animated");
});

// 閉じるボタンでドロワーを閉じる
jQuery("#js-drawer-close").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");
  jQuery("body").removeClass("is-fixed");

  // アニメーションもリセット
  jQuery(".drawer-animation__item").removeClass("is-animated");
});

// リンクをクリックしたらそのセクションまでスクロール
jQuery("a[href^='#']").on("click", function (e) {
  e.preventDefault(); // デフォルトのページ遷移を防ぐ

  const speed = 300;
  const id = jQuery(this).attr("href");
  const target = jQuery(id === "#" || id === "" ? "html" : id);

  // ヘッダーの高さを取得（position: fixed; の場合）
  const headerHeight = jQuery(".header").length
    ? jQuery(".header").outerHeight()
    : 0;

  // スクロール位置を計算（ヘッダーの高さのみ考慮）
  const position = target.length ? target.offset().top - headerHeight - 20 : 0;

  // スクロールを実行
  jQuery("html, body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing"
  );
});

// ギャラリーセクションのスライダー
const gallerySwiper = new Swiper(".gallery-swiper", {
  slidesPerView: 3.5,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  speed: 3000,
  effect: "slide",
});

// フェードイン
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in-view");
      }
    });
  },
  {
    rootMargin: "0px 0px", //
    threshold: 1, // 100%見えたら発火
  }
);

// フェードインの対象を取得
const fadeInElements = document.querySelectorAll(".js-in-view");

// フェードインの対象を監視
fadeInElements.forEach((element) => {
  observer.observe(element);
});
