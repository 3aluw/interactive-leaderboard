<template>
    <section id="how-it-works">
  <h2>How It Works ⚡</h2>
  <ol>
    <li>
      <strong>Set Your Game Settings</strong><br>
      Choose your game duration, scoring rules, and other preferences to customize the experience.
    </li>
    <li>
      <strong>Manage Team Names &amp; Avatars</strong><br>
      Pick your own creative team names and avatars — or let the app surprise you with randomly generated ones. 🎯
    </li>
    <li>
      <strong>Track Real-World Performance</strong><br>
      Add or deduct points from each team based on their actual performance in real life.
    </li>
    <li>
      <strong>See Who Comes Out on Top</strong><br>
      When the game ends, a <strong>leaderboard</strong> will automatically show the final rankings and crown the winner. 🏆
    </li>
  </ol>
</section>
</template>

<style scoped>
  #how-it-works {
    max-width: 700px;
    min-height: 40rem;
    margin: 50px auto;
    padding: 30px; 
    background: #fff;
    color: #333;
    border-radius: 15px;
    border: 2px solid #FFF9B8;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    font-family: 'Segoe UI', Tahoma, sans-serif;
    overflow-y: scroll;
     scrollbar-width: none; 
  }

  #how-it-works h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 25px;
    color: #FF3636;
    letter-spacing: 1px;
  }

  #how-it-works ol {
    list-style: none;
    padding-left: 0;
    counter-reset: step;
  }

  #how-it-works li {
    margin-bottom: 20px;
    padding: 20px;
    background: #FFF9B8;
    border-left: 5px solid #FF3636;
    border-radius: 10px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    counter-increment: step;
    position: relative;
  }

  #how-it-works li::before {
    content: counter(step);
    position: absolute;
    left: -35px;
    top: 50%;
    transform: translateY(-50%);
    background: #FF3636;
    color: #fff;
    font-weight: bold;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.9rem;
  }

  #how-it-works li:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 54, 54, 0.2);
  }

  #how-it-works strong {
    color: #FF3636;
    font-size: 1.1rem;
  }

  @media (max-width: 600px) {
    #how-it-works {
      padding: 20px;
    }

    #how-it-works h2 {
      font-size: 1.5rem;
    }
  }
</style>