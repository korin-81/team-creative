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

// ヘッダーの背景色変更（安全に）
window.addEventListener("scroll", () => {
  const headerFollow = document.querySelector(".header-follow");
  const newsSection = document.querySelector("#news");

  if (!headerFollow || !newsSection) return; // どっちかないなら処理しない

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const newsTop = newsSection.offsetTop;

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
  },
});

// すべてのアニメーション対象を取得
const conceptAnimations = document.querySelectorAll(".concept-animation__item");

// Intersection Observerの設定
const animationOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2, // 20% 以上画面内に入ったら発火
};

// 要素が画面に入ったときのコールバック
const animationCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-animated"); // アニメーション実行
      observer.unobserve(entry.target); // 監視解除（再アニメーションを防ぐ）
    }
  });
};

// Observerインスタンスを作成
const animationObserver = new IntersectionObserver(
  animationCallback,
  animationOptions
);

// すべての対象要素を監視
conceptAnimations.forEach((item) => {
  animationObserver.observe(item);
});

jQuery(".header__open").on("click", function (e) {
  e.preventDefault();
  jQuery(".header__open").toggleClass("is-checked");
  jQuery("#js-drawer-content").toggleClass("is-checked");
  jQuery("body").toggleClass("is-fixed");

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

jQuery(".drawer__content .service__nav-link").on("click", function (e) {
  e.preventDefault();

  const $nav = jQuery(this);
  const $target = $nav.next(".service__item-link"); // ←ここを修正！

  $nav.toggleClass("is-open");
  $target.stop().slideToggle(300);
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

// サービスセクションのスライド
// サービスセクションの要素を監視
const serviceObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-animated"); // 一度追加したらそのまま
        observer.unobserve(entry.target); // 監視を停止（再アニメーションを防ぐ）
      }
    });
  },
  {
    rootMargin: "-20% 0px",
    threshold: 0.2, // 20% 以上画面内に入ったら発火
  }
);

// 監視対象の要素を取得
const serviceItems = document.querySelectorAll(".service-content__item");

// 各要素の監視を開始
serviceItems.forEach((item) => {
  serviceObserver.observe(item);
});

// ギャラリーセクションのスライダー
const gallerySwiper = new Swiper(".gallery-swiper", {
  slidesPerView: 2.4,
  spaceBetween: 6,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 3.5,
      spaceBetween: 30,
    },
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

// サービスセクションのデコレーションアニメーション
// サービスデコレーション（安全に）
const serviceDecoration = document.querySelector(".service-decoration");

if (serviceDecoration) {
  const decorationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-checked");
          decorationObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  decorationObserver.observe(serviceDecoration);
}

// こりんさんcontact headの左右アニメーション
document.addEventListener("DOMContentLoaded", function () {
  const contactSection = document.querySelector(".l-contact");

  if (contactSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            contactSection.classList.add("is-active");
            observer.unobserve(entry.target); // 一度発火したら監視をやめる
          }
        });
      },
      { threshold: 0.3 } // 30%見えたら発火
    );

    observer.observe(contactSection);
  }
});
