// TKGさん
// ヘッダーの出現
window.addEventListener("scroll", () => {
  const headerFollow = document.querySelector(".header-follow");

  if (!headerFollow) return;

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const newsSection = document.querySelector("#news");

  // newsがある場合 → newsの位置で判定
  if (newsSection) {
    const newsTop = newsSection.offsetTop;

    if (scrollTop >= newsTop) {
      headerFollow.classList.add("is-show");
    } else {
      headerFollow.classList.remove("is-show");
    }
  } else {
    // newsがない場合 → 300pxで判定
    if (scrollTop >= 300) {
      headerFollow.classList.add("is-show");
    } else {
      headerFollow.classList.remove("is-show");
    }
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

  // ✅ SPサイズのときだけ body に is-fixed を付与
  if (window.innerWidth < 768) {
    jQuery("body").toggleClass("is-fixed");
  }

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

  // ✅ SPサイズのときだけ is-fixed を削除
  if (window.innerWidth < 768) {
    jQuery("body").removeClass("is-fixed");
  }

  jQuery(".drawer-animation__item").removeClass("is-animated");
});

// 閉じるボタンでドロワーを閉じる
jQuery("#js-drawer-close").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");

  // ✅ SPサイズのときだけ is-fixed を削除
  if (window.innerWidth < 768) {
    jQuery("body").removeClass("is-fixed");
  }

  jQuery(".drawer-animation__item").removeClass("is-animated");
});

jQuery("a").on("click", function (e) {
  // ドロワーが開いてる状態なら閉じる
  if (jQuery("#js-drawer-content").hasClass("is-checked")) {
    jQuery("#js-drawer-icon").removeClass("is-checked");
    jQuery("#js-drawer-content").removeClass("is-checked");
    jQuery("body").removeClass("is-fixed");
    jQuery(".drawer-animation__item").removeClass("is-animated");
  }
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
// 一旦コメントアウト
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

// フェードインの対象を取得
// 一旦コメントアウト
// const fadeInElements = document.querySelectorAll(".js-in-view");

// // フェードインの対象を監視
// 一旦コメントアウト
// fadeInElements.forEach((element) => {
//   observer.observe(element);
// });

// // サービスセクションのデコレーションアニメーション
// // サービスデコレーション（安全に）
// 一旦コメントアウト
// const serviceDecoration = document.querySelector(".service-decoration");

// if (serviceDecoration) {
//   const decorationObserver = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("is-checked");
//           decorationObserver.unobserve(entry.target);
//         }
//       });
//     },
//     {
//       threshold: 0.3,
//     }
//   );

//   decorationObserver.observe(serviceDecoration);
// }

function setServiceNavBehavior() {
  const windowWidth = window.innerWidth;

  // 既存のイベントを一旦解除してから再設定（リサイズ対応も見越して）
  jQuery(".service__nav-link").off();
  jQuery(".service__item-link").off();

  if (windowWidth < 768) {
    // 🔽 768未満：クリックでスライドトグル
    jQuery(".service__nav-link").on("click", function (e) {
      e.preventDefault();
      const $nav = jQuery(this);
      const $target = $nav.next(".service__item-link");

      $nav.toggleClass("is-open");
      $target.stop().slideToggle(300);
    });
  } else {
    // 🔼 768以上：ホバーで表示
    jQuery(".service__nav-link")
      .on("mouseenter", function () {
        jQuery(".service__item-link").addClass("is-show");
      })
      .on("mouseleave", function () {
        if (!jQuery(".service__item-link:hover").length) {
          jQuery(".service__item-link").removeClass("is-show");
        }
      });

    jQuery(".service__item-link").on("mouseleave", function () {
      if (!jQuery(".service__nav-link:hover").length) {
        jQuery(this).removeClass("is-show");
      }
    });
  }
}

// 初期化
setServiceNavBehavior();

// リサイズ時にも再設定（レスポンシブ対応）
jQuery(window).on("resize", function () {
  setServiceNavBehavior();
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





// フェードインまとめました！ こりん 
// 再度まとめることが必要です！！！！！！
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


// newsアーカイブのスライドイン
document.addEventListener("DOMContentLoaded", function () {
  const newsSections = document.querySelectorAll(".p-news__cards");

  if (newsSections.length > 0) {
    let currentIndex = 0; // 最初の `.p-news__cards` のインデックス

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-active");
          observer.unobserve(entry.target); // 監視を解除

          // 次のセクションの監視は、スクロールしたら開始
          if (currentIndex + 1 < newsSections.length) {
            window.addEventListener("scroll", handleScroll);
          }
        }
      });
    }, { threshold: 0.3 });

    // スクロールしたら次の `.p-news__cards` を監視開始
    function handleScroll() {
      if (currentIndex + 1 < newsSections.length) {
        observer.observe(newsSections[currentIndex + 1]);
        currentIndex++;
        window.removeEventListener("scroll", handleScroll); // 監視開始後はイベントを削除
      }
    }

    // 最初の `.p-news__cards` だけ監視開始
    observer.observe(newsSections[currentIndex]);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const newsCardsContainer = document.querySelector(".p-news__cards");
  const lowerNewsCards = document.querySelectorAll(".p-news__card:nth-child(n+4)"); // 4番目以降を取得

  if (newsCardsContainer && lowerNewsCards.length > 0) {
    // 上段の3つを即時表示
    newsCardsContainer.classList.add("is-active");

    // 下段のカードを監視する
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          newsCardsContainer.classList.add("is-active-lower");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(lowerNewsCards[0]); // 下段の最初の要素を監視
  }
});



// serviceのアコーディオン・リンク押下後のスクロール
jQuery(document).ready(function () {
  // アコーディオンの開閉処理
  jQuery(".service-js-accordion").on("click", function (e) {
    e.preventDefault();

    var parent = jQuery(this).parent();
    var content = jQuery(this).next();

    if (parent.hasClass("is-open")) {
      parent.removeClass("is-open");
      content.stop().slideUp(600);
    } else {
      parent.addClass("is-open");
      content.stop().slideDown(600);
    }
  });

  // メニューのリンクをクリックしたときに該当のアコーディオンを開く処理
  jQuery(".p-service__box").on("click", function (e) {
    var targetId = jQuery(this).attr("href"); // 例: "#new-born"
    var target = jQuery(targetId);

    if (target.length) {
      e.preventDefault();

      // **すべてのアニメーションを停止**
      jQuery("html, body").stop();
      jQuery(".p-service__price-box-ac-detail").stop();

      // **すべてのアコーディオンを閉じる**
      jQuery(".p-service__price-box-ac-one").removeClass("is-open");
      jQuery(".p-service__price-box-ac-detail").slideUp(300);

      // **アコーディオンを開く**
      var accordionButton = target.find(".service-js-accordion");
      var accordionContent = accordionButton.next();

      target.find(".p-service__price-box-ac-one").addClass("is-open");

      accordionContent.slideDown(600, function () {
        // **開いた後にidの位置へスクロール**
        var targetOffset = target.offset().top - 120;
        jQuery("html, body").animate(
          {
            scrollTop: targetOffset,
          },
          500
        );
      });
    }
  });
});

// 予約フォーム日付オプション
document.addEventListener("DOMContentLoaded", function () {
  // すべての select 要素を取得
  const selects = document.querySelectorAll(".form-select_date");

  // 今日の日付を取得
  const today = new Date();

  // 曜日リスト（0: 日曜 ～ 6: 土曜）
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  // 1か月後から6か月後までの全日を追加
  const startDate = new Date(today);
  startDate.setMonth(today.getMonth() + 1); // 1か月後の同じ日
  const endDate = new Date(today);
  endDate.setMonth(today.getMonth() + 6); // 6か月後の同じ日

  while (startDate <= endDate) {
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1; // getMonth() は0始まりなので +1
    const day = startDate.getDate();
    const weekDay = weekDays[startDate.getDay()]; // 曜日を取得

    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const displayDate = `${year}年${month}月${day}日（${weekDay}）`;

    // 各 select にオプションを追加
    selects.forEach(select => {
      const option = document.createElement("option");
      option.value = formattedDate;
      option.textContent = displayDate;
      select.appendChild(option);
    });

    // 日付を1日進める
    startDate.setDate(startDate.getDate() + 1);
  }
});

// フォームのバリデーション
const form = jQuery("#js-form");
const inputElements = form.find(".js-form-input");

form.on("submit", function (e) {
  e.preventDefault();

  inputElements.removeClass("is-error");
  const isValid = form[0].checkValidity();
  if (isValid) {
    alert("送信完了");
    form[0].reset();
  }
});

inputElements.on("invalid", function () {
  jQuery(this).addClass("is-error");
});

inputElements.on("input", function () {
  if (this.checkValidity()) {
    jQuery(this).removeClass("is-error");
  }
});



// serviceページの上部リンクアニメーション
document.addEventListener("DOMContentLoaded", function () {
  const serviceBoxes = document.querySelectorAll(".p-service__box");

  serviceBoxes.forEach((box, index) => {
    if (index % 2 === 0) {
      box.classList.add("view-slidein-r"); // 奇数（0, 2, 4...）は右からスライドイン
    } else {
      box.classList.add("view-slideup"); // 偶数（1, 3, 5...）は下からスライドイン
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-active");
        }
      });
    },
    { threshold: 0.2 }
  );

  serviceBoxes.forEach((box) => {
    observer.observe(box);
  });
});









// ローディング
// window.addEventListener("load", function() {
//   setTimeout(function() {
//     // ローディング画面を非表示にする
//     document.getElementById("loading").style.display = "none";
    
//     // FVをフェードイン
//     document.getElementById("fv").style.opacity = "1";
//   }, 3000); // 1.5秒後に切り替え
// });




