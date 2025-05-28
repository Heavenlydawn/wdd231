async function loadSpotlights() {
  const res = await fetch('data/members.json');
  const members = await res.json();
  const goldSilver = members.filter(m => m.membershipLevel >= 2);
  const container = document.getElementById('spotlightsContainer');

  let index = 0;

  function getCardsPerSlide() {
    return window.innerWidth < 768 ? 1 : 3;
  }

  function showSlide() {
    const cardsPerSlide = getCardsPerSlide();
    const visibleMembers = [];

    for (let i = 0; i < cardsPerSlide; i++) {
      visibleMembers.push(goldSilver[(index + i) % goldSilver.length]);
    }

    container.classList.add('fade-out');
    
    setTimeout(() => {
      container.innerHTML = visibleMembers.map(m => `
        <div class="card">
          <h3>${m.name}</h3>
          <img src="${m.image}" alt="${m.name} logo" loading="lazy" width="100" height="100">
          <p><strong>Phone:</strong> ${m.phone}</p>
          <p><strong>Address:</strong> ${m.address}</p>
          <a href="${m.website}" target="_blank">Website</a>
          <p><strong>${m.membershipLevel === 3 ? 'Gold' : 'Silver'} Member</strong></p>
        </div>
      `).join('');
      
      container.classList.remove('fade-out');
      container.classList.add('fade-in');

      setTimeout(() => {
        container.classList.remove('fade-in');
      }, 500);
    }, 300);

    index = (index + cardsPerSlide) % goldSilver.length;
    setTimeout(showSlide, 6000); // Slower rotation: 6 seconds
  }

  window.addEventListener('resize', () => {
    index = 0;
    showSlide();
  });

  showSlide();
}

loadSpotlights();
