// TKGさん
// ヘッダーのパディング自動調整
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const wrapper = document.querySelector(".wrapper");

  function adjustPadding() {
    let headerHeight = header.offsetHeight; // 現在のヘッダーの高さを取得
    wrapper.style.paddingTop = headerHeight + "px"; // その高さ分のパディングを設定
  }

  adjustPadding();
  window.addEventListener("resize", adjustPadding); // ウィンドウサイズ変更時に再調整
});

// ヘッダーの透明化
const jsHeader = document.querySelector("#js-header");
const fvSection = document.querySelector(".fv"); // .fvセクション
const newsSection = document.querySelector(".news"); // .newsセクション

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const fvTop = fvSection.offsetTop;
  const newsTop = newsSection.offsetTop;
  const newsHeight = newsSection.offsetHeight;

  // fvセクション内からnewsセクションが終わるまで透明化
  if (scrollTop >= fvTop && scrollTop < newsTop + newsHeight) {
    jsHeader.classList.add("is-scrolled");
  } else {
    jsHeader.classList.remove("is-scrolled");
  }
});

// FVのスライダー
const swiper = new Swiper(".swiper", {
  loop: true, // 画像をループさせる

  // 自動再生の設定
  autoplay: {
    delay: 5000, // 5秒間隔
    disableOnInteraction: false, // ユーザー操作後も自動再生を継続
  },

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

// ドロワーの開閉
jQuery("#js-drawer-icon").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-icon").toggleClass("is-checked");
  jQuery("#js-drawer-content").toggleClass("is-checked");
  jQuery("body").toggleClass("is-fixed");
});

jQuery("#js-drawer-content a[href^='#']").on("click", function (e) {
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");
  jQuery("body").removeClass("is-fixed");
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

// フェードイン TKGさん
// const observer = new IntersectionObserver(
//   function (entries) {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("is-in-view");
//       }
//     });
//   },
//   {
//     rootMargin: "0px 0px", //
//     threshold: 1, // 100%見えたら発火
//   }
// );

// // フェードインの対象を取得
// const fadeInElements = document.querySelectorAll(".js-in-view");

// // フェードインの対象を監視
// fadeInElements.forEach((element) => {
//   observer.observe(element);
// });

// フェードインまとめました！　こりん
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

// ページロード時にアニメーションを発火
document.addEventListener("DOMContentLoaded", function() {
  const fadeInElements = document.querySelectorAll(".js-fade-in-load");

  // ページ読み込み後にアニメーションを発火
  fadeInElements.forEach((element) => {
    element.classList.add("is-faded-in-load");
    observer.observe(element); // IntersectionObserverでの監視も開始
  });
});

// IntersectionObserverでの監視対象を追加
const fadeInElements = document.querySelectorAll(".js-in-view");

// IntersectionObserverで監視を開始
fadeInElements.forEach((element) => {
  observer.observe(element);
});




// こりん

// ローディング
// window.addEventListener("load", function() {
//   setTimeout(function() {
//     // ローディング画面を非表示にする
//     document.getElementById("loading").style.display = "none";
    
//     // FVをフェードイン
//     document.getElementById("fv").style.opacity = "1";
//   }, 3000); // 1.5秒後に切り替え
// });

document.addEventListener("DOMContentLoaded", function () {
  const contactSection = document.querySelector(".js-slidein");

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


// contact headの左右アニメーション
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

// サービス アコーディオン
// jQuery(".service-js-accordion").on("click", function (e) {
//   e.preventDefault();

//   if (jQuery(this).parent().hasClass("is-open")) {
//     jQuery(this).parent().removeClass("is-open");
//     jQuery(this).next().slideUp(600);
//   } else {
//     jQuery(this).parent().addClass("is-open");
//     jQuery(this).next().slideDown(600);
//   }
// });

jQuery(document).ready(function () {
  // アコーディオンの開閉処理
  jQuery(".service-js-accordion").on("click", function (e) {
    e.preventDefault();

    var parent = jQuery(this).parent();
    var content = jQuery(this).next();

    if (parent.hasClass("is-open")) {
      parent.removeClass("is-open");
      content.slideUp(600);
    } else {
      parent.addClass("is-open");
      content.slideDown(600);
    }
  });

  // メニューのリンクをクリックしたときに該当のアコーディオンを開く処理
  jQuery(".p-service__box").on("click", function (e) {
    var targetId = jQuery(this).attr("href"); // 例: "#new-born"
    var target = jQuery(targetId);

    if (target.length) {
      e.preventDefault();

      // すべてのアコーディオンを閉じる
      jQuery(".p-service__price-box-ac-one").removeClass("is-open");
      jQuery(".p-service__price-box-ac-detail").slideUp(600);

      // 該当のアコーディオンを開く
      var accordionButton = target.find(".service-js-accordion");
      var accordionContent = accordionButton.next();

      target.find(".p-service__price-box-ac-one").addClass("is-open");
      accordionContent.slideDown(600);
    }
  });
});