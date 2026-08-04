const menuBtn=document.getElementById('menuBtn'), mobileMenu=document.getElementById('mobileMenu');
  menuBtn.addEventListener('click',()=>mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));

  function calc(){
    const before=Number(document.getElementById('beforeKw').value)||0;
    const after=Number(document.getElementById('afterKw').value)||0;
    const hours=Number(document.getElementById('hours').value)||0;
    const rate=Number(document.getElementById('rate').value)||0;
    const inv=Number(document.getElementById('investment').value)||0;
    const save=Math.max(0,before-after), kwh=save*hours, cost=kwh*rate;
    const savingRate=before>0?(save/before*100):0;
    const roi=inv>0?cost/inv*100:0, pay=cost>0?inv/cost:0;
    document.getElementById('savingKw').textContent=save.toFixed(3)+' kW';
    document.getElementById('savingRate').textContent=savingRate.toFixed(1)+'%';
    document.getElementById('annualKwh').textContent=Math.round(kwh).toLocaleString('ko-KR')+' kWh';
    document.getElementById('annualCost').textContent=Math.round(cost).toLocaleString('ko-KR')+'원';
    document.getElementById('roi').textContent=roi.toFixed(1)+'%';
    document.getElementById('payback').textContent=pay.toFixed(1)+'년';
  }
  document.getElementById('calcBtn').addEventListener('click',calc);
  ['beforeKw','afterKw','hours','rate','investment'].forEach(id=>document.getElementById(id).addEventListener('input',calc));

  // Google Apps Script 웹 앱 주소
  const GOOGLE_SCRIPT_WEB_APP_URL =
    'https://script.google.com/macros/s/AKfycbyCrvuOV_1JlDnjNJGcXZLsMsHYkkB-o_3IRbEcC4CkQWkOreV42VwVE-lJ7-049RFS/exec';

  document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const submitBtn = document.getElementById('contactSubmitBtn');
    const status = document.getElementById('contactFormStatus');
    const originalText = submitBtn.textContent;

    const companyName = document.getElementById('companyName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!companyName || !phone) {
      status.style.display = 'block';
      status.style.background = 'rgba(239,68,68,.14)';
      status.style.border = '1px solid rgba(239,68,68,.35)';
      status.style.color = '#fecaca';
      status.textContent = '회사명·담당자명과 연락처를 입력해 주세요.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = '문의 접수 중...';
    status.style.display = 'block';
    status.style.background = 'rgba(34,183,216,.12)';
    status.style.border = '1px solid rgba(34,183,216,.30)';
    status.style.color = '#bae6fd';
    status.textContent = '문의 내용을 안전하게 전송하고 있습니다.';

    const payload = new URLSearchParams({
      companyName,
      phone,
      email,
      message,
      submittedAt: new Date().toLocaleString('ko-KR'),
      sourcePage: location.href
    });

    try {
      await fetch(GOOGLE_SCRIPT_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: payload
      });

      status.style.background = 'rgba(16,185,129,.14)';
      status.style.border = '1px solid rgba(16,185,129,.35)';
      status.style.color = '#bbf7d0';
      status.textContent = '문의가 정상적으로 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.';
      form.reset();
    } catch (error) {
      console.error(error);
      status.style.background = 'rgba(239,68,68,.14)';
      status.style.border = '1px solid rgba(239,68,68,.35)';
      status.style.color = '#fecaca';
      status.textContent = '전송 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 1100@smtech.me로 문의해 주세요.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('show');observer.unobserve(e.target)}
  }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));



document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const id=this.getAttribute('href');
    const el=document.querySelector(id);
    if(!el) return;
    e.preventDefault();
    const y=el.getBoundingClientRect().top+window.pageYOffset-80;
    window.scrollTo({top:y,behavior:'smooth'});
  });
});



(function(){
  const header = document.querySelector('header');
  const backToTop = document.getElementById('backToTop');

  function onScroll(){
    const y = window.scrollY || document.documentElement.scrollTop;
    if(header) header.classList.toggle('header-scrolled', y > 20);
    if(backToTop) backToTop.classList.toggle('show', y > 520);
  }

  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  if(backToTop){
    backToTop.addEventListener('click', () => {
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  const proof = document.querySelector('.corporate-proof');
  if(proof && 'IntersectionObserver' in window){
    let animated = false;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting && !animated){
          animated = true;
          proof.querySelectorAll('[data-count]').forEach(el => {
            const target = Number(el.dataset.count || 0);
            const start = performance.now();
            const duration = 900;
            function tick(now){
              const p = Math.min(1,(now-start)/duration);
              const eased = 1-Math.pow(1-p,3);
              el.textContent = Math.round(target*eased);
              if(p<1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
          });
          io.disconnect();
        }
      });
    }, {threshold:.35});
    io.observe(proof);
  }
})();



(function(){
  const businessData = {
    fan: {
      kicker: "01 · MAINTENANCE",
      title: "송풍기 제작 · 수리",
      lead: "송풍기와 회전기기의 전문 수리·유지보수 서비스를 제공하고, 신속한 진단과 정비로 설비의 안정 운전을 지원합니다.",
      image: "assets/images/image_010_a1b51bb83f.jpg",
      alt: "송풍기 수리 작업 사진",
      caption: "송풍기 수리 서비스 범위·차별점·주요 실적 및 작업 사례",
      subtitle: "주요 작업 범위",
      list: [
        "송풍기·전동기·펌프 등 회전기기 전반 정비",
        "진동분석·정밀 얼라인먼트·현장 바란싱 및 베어링·샤프트 교체",
        "부품 모듈화와 신속한 정비로 가동 중지시간 최소화"
      ],
      note: "현장 조건과 설비 상태를 확인하여 필요한 작업 범위와 개선방안을 제안합니다."
    },
    construction: {
      kicker: "02 · CONSTRUCTION",
      title: "기계설비가스공사업",
      lead: "건축물과 각종 시설에 필요한 공조·환기·냉난방·배관 설비의 시공과 개량공사를 수행합니다.",
      image: "assets/images/image_014_4b79a2e421.jpg",
      alt: "기계설비 공사 작업 사진",
      caption: "덕트·배관·밸브·열교환기·펌프 교체 및 시공 사례",
      subtitle: "주요 공사 분야",
      list: [
        "공조·환기·냉난방·위생·배관 공사",
        "덕트·보온·자동제어·방음·방진 공사",
        "학교·병원·공공기관·상업시설 등 현장 대응"
      ],
      note: "설비의 사용 목적과 현장 여건에 맞춰 안전하고 효율적인 시공 방안을 제안합니다."
    },
    inspection: {
      kicker: "03 · PERFORMANCE INSPECTION",
      title: "기계설비성능점검업",
      lead: "기계설비법에 따른 정기 성능점검으로 설비 상태와 에너지 효율을 확인하고, 점검 결과에 따른 개선방안을 제시합니다.",
      image: "assets/images/image_015_c916b4199f.jpg",
      alt: "기계설비 성능점검 작업 사진",
      caption: "기계설비 성능점검 대상별 계측·진단 사례",
      subtitle: "점검 및 관리 내용",
      list: [
        "열화상카메라·유량계·풍량계 등 계측 장비 활용",
        "성능점검표 기록·보관 및 결과에 따른 개선안 제시",
        "에너지 비용 절감과 설비 수명 연장 지원"
      ],
      note: "점검 대상과 법정 주기를 확인하여 체계적인 성능점검 계획을 수립합니다."
    },
    filter: {
      kicker: "04 · FILTER SERVICE",
      title: "필터 교체 · 유지관리",
      lead: "공조·환기설비의 오염된 필터를 적기에 교체해 공기질과 설비 운전 효율을 유지합니다.",
      image: "assets/images/image_016_4a80fc3022.jpg",
      alt: "공조 및 환기설비 필터 교체 작업 사진",
      caption: "프리필터·미디엄필터·HEPA필터 교체 작업 사례",
      subtitle: "필터 관리 효과",
      list: [
        "막힘과 압력손실 예방으로 에너지 소모 저감",
        "프리·미디엄·HEPA 필터 상태 확인 및 교체",
        "학교·병원·건물·작업공간의 청정 환경 유지"
      ],
      note: "사용 환경과 오염 상태에 맞춰 적절한 필터 종류와 교체 주기를 안내합니다."
    }
  };

  const detail = document.getElementById("businessDetail");
  const cards = document.querySelectorAll(".business-card-clickable");
  const closeBtn = document.getElementById("businessDetailClose");

  function showBusiness(key, shouldScroll){
    const data = businessData[key];
    if(!data || !detail) return;

    document.getElementById("businessDetailKicker").textContent = data.kicker;
    document.getElementById("businessDetailTitle").textContent = data.title;
    document.getElementById("businessDetailLead").textContent = data.lead;
    const img = document.getElementById("businessDetailImage");
    img.src = data.image;
    img.alt = data.alt;
    document.getElementById("businessDetailCaption").textContent = data.caption;
    document.getElementById("businessDetailSubTitle").textContent = data.subtitle;
    document.getElementById("businessDetailList").innerHTML = data.list.map(item => "<li>"+item+"</li>").join("");
    document.getElementById("businessDetailNote").textContent = data.note;

    cards.forEach(card => {
      card.classList.toggle("active", card.dataset.business === key);
      card.setAttribute("aria-expanded", card.dataset.business === key ? "true" : "false");
    });
    detail.classList.add("open");
    if(shouldScroll){
      setTimeout(() => detail.scrollIntoView({behavior:"smooth", block:"center"}), 80);
    }
  }

  cards.forEach(card => {
    card.setAttribute("aria-expanded","false");
    card.addEventListener("click", () => showBusiness(card.dataset.business, true));
    card.addEventListener("keydown", e => {
      if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        showBusiness(card.dataset.business, true);
      }
    });
  });

  if(closeBtn){
    closeBtn.addEventListener("click", () => {
      detail.classList.remove("open");
      cards.forEach(card => {
        card.classList.remove("active");
        card.setAttribute("aria-expanded","false");
      });
    });
  }

  // 첫 화면에서는 상세 패널을 접어두고 카드 클릭 시 펼침
  detail.classList.remove("open");
})();