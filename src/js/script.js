let simple_password_checker = {

  id_password: '',
  id_entrophy: '',
  id_strip: '',

  html_empty_strip: '',
  css_transition: '0.5s',

  text_weak: 'Weak',
  text_good: 'Good',
  text_strong: 'Strong',

  css_weak: 'badge badge-danger',
  css_good: 'badge badge-warning',
  css_strong: 'badge badge-success',

  score_strong: 25,
  score_good: 20,
  min_length: 8,

  el_password: null,
  el_entrophy: null,
  el_strip: null,

  debug: true,

  init: function (options) {

    if (options.id_password != undefined) {
      this.id_password = options.id_password;
    }
    if (options.id_entrophy != undefined) {
      this.id_entrophy = options.id_entrophy;
    }
    if (options.id_strip != undefined) {
      this.id_strip = options.id_strip;
    }
    if (options.html_empty_strip != undefined) {
      this.html_empty_strip = options.html_empty_strip;
    }
    if (options.css_transition != undefined) {
      this.css_transition = options.css_transition;
    }
    if (options.text_weak != undefined) {
      this.text_weak = options.text_weak;
    }
    if (options.text_good != undefined) {
      this.text_good = options.text_good;
    }
    if (options.text_strong != undefined) {
      this.text_strong = options.text_strong;
    }
    if (options.css_weak != undefined) {
      this.css_weak = options.css_weak;
    }
    if (options.css_good != undefined) {
      this.css_good = options.css_good;
    }
    if (options.css_strong != undefined) {
      this.css_strong = options.css_strong;
    }
    if (options.score_strong != undefined) {
      this.score_strong = parseInt(options.score_strong);
    }
    if (options.score_good != undefined) {
      this.score_good = parseInt(options.score_good);
    }
    if (options.min_length != undefined) {
      this.min_length = parseInt(options.min_length);
    }
    if (options.debug != undefined) {
      this.debug = options.debug;
    }

    let self = this;

    if (!document.getElementById) {
      self.debug && alert("Your browser is too old - password checker does not support too old browsers.");
      return;
    }

    if (!self.id_password) {
      self.debug && alert("Please specify input field for password.");
      return;
    }

    self.el_password = document.getElementById(self.id_password);
    if (!self.el_password) {
      self.debug && alert(`Input field for password ${self.id_password} not found.`);
      return;
    }

    if (self.id_entrophy) {
      self.el_entrophy = document.getElementById(self.id_entrophy);
      if (!self.el_entrophy) {
        self.debug && alert(`Field for [${self.el_entrophy}] not found`);
      }
    }

    if (self.id_strip) {
      self.el_strip = document.getElementById(self.id_strip);
      if (!self.el_strip) {
        self.debug && alert(`Field for [${self.id_strip}] not found`);
      }
    }

    self.el_password.onkeyup = function () {
      self.checkPassStrength(self.el_password.value);
    };

    if (self.el_password.value) {
      self.checkPassStrength(self.el_password.value);
    }

  },

  checkPassStrength: function (pwd) {

    let self = this,
      perc;
      pwd = (pwd == undefined) ? '' : pwd.toString().replace(/^\s+|\s+$/g, ""),
      score = self.calculatePwdScore(pwd),
      hasMinChars = !this.min_length || pwd.length >= this.min_length;

    perc = score;
    if (perc < 0) {
      perc = 0;
    } else if (perc > 100) {
      perc = 100;
    }

    if (self.el_entrophy) {
      self.el_entrophy.value = perc;
    }

    if (self.el_strip) {
      self.el_strip.style.width = perc + "%";
      if (self.css_transition) {
        self.el_strip.style.transition = self.css_transition;
      }

      self.removeClass(self.el_strip, self.css_weak);
      self.removeClass(self.el_strip, self.css_good);
      self.removeClass(self.el_strip, self.css_strong);

      if (hasMinChars && perc >= self.score_strong) {
        self.addClass(self.el_strip, self.css_strong);
        self.el_strip.innerHTML = self.text_strong;
      } else if (hasMinChars && score >= self.score_good) {
        self.addClass(self.el_strip, self.css_good);
        self.el_strip.innerHTML = self.text_good;
      } else if (pwd) {
        self.addClass(self.el_strip, self.css_weak);
        self.el_strip.innerHTML = self.text_weak;
      } else {
        self.el_strip.innerHTML = self.html_empty_strip;
        self.el_strip.style.width = '';
      }
    }
  },

  calculatePwdScore: function (pwd) {
    let score = 0;
    if (!pwd) {
      return score;
    }
    let letters = new Object();
    for (let i = 0; i < pwd.length; i++) {
      letters[pwd[i]] = (letters[pwd[i]] || 0) + 1;
      score += 3.0 / letters[pwd[i]];
    }

    let letiations = {
      digits: /\d/.test(pwd),
      lower: /[a-z]/.test(pwd),
      upper: /[A-Z]/.test(pwd),
      nonWords: /\W/.test(pwd),
    }

    letiationCount = 0;
    for (let check in letiations) {
      letiationCount += (letiations[check] == true) ? 1 : 0;
    }
    score += (letiationCount - 1) * 10;

    return parseInt(score, 10);
  },

  hasClass: function (ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  },

  addClass: function (ele, cls) {
    let space = ele.className.length > 1 ? ' ' : '';
    if (!this.hasClass(ele, cls)) {
      ele.className += space + cls;
    }
  },

  removeClass: function (ele, cls) {
    if (this.hasClass(ele, cls)) {
      let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      ele.className = ele.className.replace(reg, ' ');
    }
  }

}