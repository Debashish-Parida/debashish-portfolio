  const emailAddress = 'debashishparida87620@gmail.com';
  const emailSubject = 'Hello Debashish';
  const protectedLinks = {
    resume: 'aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xekFRLVdoeTFJbVpVUFJ0b1ZudHU1ODBJNG5ucUtJdWwvdmlldz91c3A9c2hhcmluZw==',
    customerDashboard: 'aHR0cHM6Ly9sb29rZXJzdHVkaW8uZ29vZ2xlLmNvbS9yZXBvcnRpbmcvNGVlMzA1MTUtMTVkMS00NmU4LTkwZTctMjBkNzVmYTcyMGIyL3BhZ2UvdTducEQ=',
    walmartDashboard: 'aHR0cHM6Ly9sb29rZXJzdHVkaW8uZ29vZ2xlLmNvbS9yZXBvcnRpbmcvZTU0NmY1Y2MtODc3Yy00YjBiLWFjMWItZjdiNzQzOGIxYTU5L3BhZ2UvQ0VyWEQ=',
    financialReports: 'aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2RyaXZlL2ZvbGRlcnMvMWs4cjJKbWg2ZVk2V2w2QmkxNmEtZURYa3V1SVBCNzJ4'
  };

  // Fade in
  const obs = new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible');});},{threshold:0.1});
  document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));

  // Modal helpers
  function openModal(id){document.getElementById(id).classList.add('open');document.body.style.overflow='hidden';}
  function closeModal(id){document.getElementById(id).classList.remove('open');document.body.style.overflow='';if(id==='certModal'){document.getElementById('certModalImg').src='';document.getElementById('certModalImg').style.display='none';document.getElementById('certLoading').style.display='flex';}}

  // Close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(el=>{
    el.addEventListener('click',e=>{if(e.target===el)closeModal(el.id);});
  });

  function openProtectedLink(key){
    const encodedUrl = protectedLinks[key];
    if(!encodedUrl) return;
    const url = atob(encodedUrl);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function isAndroid(){return /Android/i.test(navigator.userAgent);}
  function isIOS(){return /iPhone|iPad|iPod/i.test(navigator.userAgent);}
  function isMobile(){return isAndroid() || isIOS() || /Mobile/i.test(navigator.userAgent);}

  function openWithFallback(appUrl, fallbackUrl){
    let fallbackTimer;
    const cancelFallback = ()=>clearTimeout(fallbackTimer);
    document.addEventListener('visibilitychange', cancelFallback, {once:true});
    window.addEventListener('pagehide', cancelFallback, {once:true});
    window.location.href = appUrl;
    fallbackTimer = setTimeout(()=>{window.location.href = fallbackUrl;}, 1400);
  }

  function getMailTarget(client){
    const to = encodeURIComponent(emailAddress);
    const subject = encodeURIComponent(emailSubject);
    const body = '';
    const mailto = 'mailto:'+to+'?subject='+subject;

    if(client === 'default') return {url: mailto};

    const webLinks = {
      gmail: 'https://mail.google.com/mail/?view=cm&to='+to+'&su='+subject,
      outlook: 'https://outlook.live.com/mail/0/deeplink/compose?to='+to+'&subject='+subject,
      yahoo: 'https://compose.mail.yahoo.com/?to='+to+'&subject='+subject
    };

    if(!isMobile()) return {url: webLinks[client]};

    if(isAndroid()){
      const androidTargets = {
        gmail: {
          app: 'intent://co?to='+to+'&subject='+subject+'&body='+body+'#Intent;scheme=googlegmail;package=com.google.android.gm;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.google.android.gm;end',
          fallback: 'https://play.google.com/store/apps/details?id=com.google.android.gm'
        },
        outlook: {
          app: 'intent://compose?to='+to+'&subject='+subject+'#Intent;scheme=ms-outlook;package=com.microsoft.office.outlook;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.microsoft.office.outlook;end',
          fallback: 'https://play.google.com/store/apps/details?id=com.microsoft.office.outlook'
        },
        yahoo: {
          app: 'intent://mail/compose?to='+to+'&subject='+subject+'#Intent;scheme=ymail;package=com.yahoo.mobile.client.android.mail;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.yahoo.mobile.client.android.mail;end',
          fallback: 'https://play.google.com/store/apps/details?id=com.yahoo.mobile.client.android.mail'
        }
      };
      return androidTargets[client];
    }

    if(isIOS()){
      const iosTargets = {
        gmail: {
          app: 'googlegmail://co?to='+to+'&subject='+subject+'&body='+body,
          fallback: 'https://apps.apple.com/app/gmail-email-by-google/id422689480'
        },
        outlook: {
          app: 'ms-outlook://compose?to='+to+'&subject='+subject,
          fallback: 'https://apps.apple.com/app/microsoft-outlook/id951937596'
        },
        yahoo: {
          app: 'ymail://mail/compose?to='+to+'&subject='+subject,
          fallback: 'https://apps.apple.com/app/yahoo-mail-organized-email/id577586159'
        }
      };
      return iosTargets[client];
    }

    return {url: mailto};
  }

  document.querySelectorAll('[data-mail-client]').forEach(link=>{
    link.addEventListener('click',event=>{
      const client = link.dataset.mailClient;
      const target = getMailTarget(client);
      if(!target) return;

      event.preventDefault();
      if(target.app && target.fallback){
        openWithFallback(target.app, target.fallback);
        return;
      }

      if(client === 'default'){
        window.location.href = target.url;
      }else{
        window.open(target.url, '_blank', 'noopener,noreferrer');
      }
    });
  });

  // Cert preview
  function showCertError(){
    document.getElementById('certError').style.display='flex';
    document.getElementById('certFooter').style.display='none';
  }
  function openCert(title, org, fileId){
    document.getElementById('certModalTitle').textContent = title;
    document.getElementById('certModalOrg').textContent = org;
    document.getElementById('certErrorTitle').textContent = title;
    const thumbUrl = 'https://drive.google.com/thumbnail?id='+fileId+'&sz=w900';
    const fullUrl  = 'https://drive.google.com/file/d/'+fileId+'/view?usp=sharing';
    const img = document.getElementById('certModalImg');
    img.style.display = 'none'; img.src = '';
    document.getElementById('certLoading').style.display = 'flex';
    document.getElementById('certError').style.display  = 'none';
    document.getElementById('certFooter').style.display = 'flex';
    document.getElementById('certErrorLink').href = fullUrl;
    document.getElementById('certModalLink').href = fullUrl;
    img.src = thumbUrl;
    openModal('certModal');
  }

  // ESC key
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal('emailModal');closeModal('certModal');}});
