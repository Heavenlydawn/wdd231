
  const courses = [
    {
      subject: 'CSE',
      number: 110,
      title: 'Introduction to Programming',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to programming...',
      technology: ['Python'],
      completed: true
    },
    {
      subject: 'WDD',
      number: 130,
      title: 'Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course introduces students to the World Wide Web...',
      technology: ['HTML', 'CSS'],
      completed: true
    },
    {
      subject: 'CSE',
      number: 111,
      title: 'Programming with Functions',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'CSE 111 students become more organized...',
      technology: ['Python'],
      completed: false
    },
    {
      subject: 'CSE',
      number: 210,
      title: 'Programming with Classes',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce the notion of classes and objects...',
      technology: ['C#'],
      completed: false
    },
    {
      subject: 'WDD',
      number: 131,
      title: 'Dynamic Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course builds on prior experience...',
      technology: ['HTML', 'CSS', 'JavaScript'],
      completed: true
    },
    {
      subject: 'WDD',
      number: 231,
      title: 'Frontend Web Development I',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course builds on prior experience...',
      technology: ['HTML', 'CSS', 'JavaScript'],
      completed: false
    }
  ];

  const courseList = document.getElementById('course-list');
  const buttons = document.querySelectorAll('.section__course button');

  function renderCourses(coursesToRender) {
    courseList.innerHTML = '';
  
    let totalCredits = 0;
  
    coursesToRender.forEach(course => {
      totalCredits += course.credits;
  
      const li = document.createElement('li');
      li.className = `course ${course.completed ? 'completed' : 'incomplete'}`;
      li.innerHTML = `
        <h3>${course.subject} ${course.number}: ${course.title}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p><strong>Status:</strong> ${course.completed ? 'Completed' : 'Incomplete'}</p>
      `;
      courseList.appendChild(li);
    });
  
    // Display total credits
    const creditDisplay = document.getElementById('total-credits');
    creditDisplay.innerHTML = `<strong>Total Credits:</strong> ${totalCredits}`;
  }

  function filterCourses(filter) {
    if (filter === 'all') {
      renderCourses(courses);
    } else {
      const filtered = courses.filter(course => course.subject === filter);
      renderCourses(filtered);
    }
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterCourses(filter);
    });
  });

  renderCourses(courses);
