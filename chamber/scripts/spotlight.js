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

    index = (index + cardsPerSlide) % goldSilver.length;
    setTimeout(showSlide, 2000); 
  }

  window.addEventListener('resize', () => {
    index = 0;
    showSlide();
  });

  showSlide();
}

loadSpotlights();
