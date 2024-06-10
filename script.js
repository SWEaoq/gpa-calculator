function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    if (!username || !password) {
        alert('Please enter your username and password');
        return;
    }

    const userData = localStorage.getItem(username + '_' + password);
    if (userData) {
        loadUserData(username, password, userData);
    } else {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
    }
}

function addCourse() {
    const courseDiv = document.createElement('div');
    courseDiv.classList.add('course');

    const courseName = document.createElement('input');
    courseName.classList.add('input-field');
    courseName.placeholder = 'Course Name';
    courseDiv.appendChild(courseName);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = '&times;';
    removeButton.onclick = () => removeCourse(courseDiv);
    courseDiv.appendChild(removeButton);

    const courseCredits = document.createElement('input');
    courseCredits.classList.add('input-field');
    courseCredits.placeholder = 'Credits';
    courseCredits.type = 'number';
    courseCredits.min = '0';
    courseDiv.appendChild(courseCredits);

    const courseGrade = document.createElement('select');
    courseGrade.classList.add('dropdown-field');
    const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
    grades.forEach(grade => {
        const option = document.createElement('option');
        option.value = grade;
        option.text = grade;
        courseGrade.appendChild(option);
    });
    courseDiv.appendChild(courseGrade);

    document.getElementById('courses').appendChild(courseDiv);
}

function removeCourse(courseDiv) {
    courseDiv.style.transition = 'transform 0.2s, opacity 0.2s';
    courseDiv.style.transform = 'scale(0.8)';
    courseDiv.style.opacity = '0';
    setTimeout(() => {
        courseDiv.remove();
    }, 200);
}

function calculateGPA() {
    const courses = document.getElementsByClassName('course');
    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < courses.length; i++) {
        const courseCredits = courses[i].getElementsByTagName('input')[1].value;
        const courseGrade = courses[i].getElementsByTagName('select')[0].value;

        const credits = parseFloat(courseCredits);
        const grade = gradeToPoint(courseGrade);

        if (!isNaN(credits) && grade !== null) {
            totalCredits += credits;
            totalPoints += credits * grade;
        }
    }

    const gpa = totalPoints / totalCredits;
    document.getElementById('result').innerText = 'Your GPA is: ' + (isNaN(gpa) ? 'N/A' : gpa.toFixed(2));

    // Trigger confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function gradeToPoint(grade) {
    switch (grade) {
        case 'A+': return 5.0;
        case 'A': return 4.75;
        case 'B+': return 4.5;
        case 'B': return 4.0;
        case 'C+': return 3.5;
        case 'C': return 3.0;
        case 'D+': return 2.5;
        case 'D': return 2.0;
        case 'F': return 0.0;
        default: return null;
    }
}

function saveUserData() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    if (!username || !password) {
        alert('Please enter your username and password');
        return;
    }

    const courses = document.getElementsByClassName('course');
    const userData = [];

    for (let i = 0; i < courses.length; i++) {
        const courseName = courses[i].getElementsByTagName('input')[0].value;
        const courseCredits = courses[i].getElementsByTagName('input')[1].value;
        const courseGrade = courses[i].getElementsByTagName('select')[0].value;

        if (courseName && courseCredits && courseGrade) {
            userData.push({
                name: courseName,
                credits: courseCredits,
                grade: courseGrade
            });
        }
    }

    localStorage.setItem(username + '_' + password, JSON.stringify(userData));
    alert('Data saved successfully');
}

function loadUserData(username, password, userData) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';

    const courses = JSON.parse(userData);
    document.getElementById('courses').innerHTML = '';

    courses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course');

        const courseName = document.createElement('input');
        courseName.classList.add('input-field');
        courseName.placeholder = 'Course Name';
        courseName.value = course.name;
        courseDiv.appendChild(courseName);

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.innerHTML = '&times;';
        removeButton.onclick = () => removeCourse(courseDiv);
        courseDiv.appendChild(removeButton);

        const courseCredits = document.createElement('input');
        courseCredits.classList.add('input-field');
        courseCredits.placeholder = 'Credits';
        courseCredits.type = 'number';
        courseCredits.min = '0';
        courseCredits.value = course.credits;
        courseDiv.appendChild(courseCredits);

        const courseGrade = document.createElement('select');
        courseGrade.classList.add('dropdown-field');
        const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
        grades.forEach(grade => {
            const option = document.createElement('option');
            option.value = grade;
            option.text = grade;
            courseGrade.appendChild(option);
        });
        courseGrade.value = course.grade;
        courseDiv.appendChild(courseGrade);

        document.getElementById('courses').appendChild(courseDiv);
    });
}
