document.addEventListener("DOMContentLoaded ", simple_password_checker.init({
  id_password: "id_password",
  id_entrophy: "id_entrophy",
  id_strip: "id_strip",
  text_weak: "<i class='fa fa-frown-o'></i> Weak password",
  text_good: "<i class='fa fa-meh-o'></i> Good password",
  text_strong: "<i class='fa fa-smile-o'></i> Strong password",
  css_weak: "badge badge-danger",
  css_good: "badge badge-warning",
  css_strong: "badge badge-success",
  score_good: 40,
	score_strong: 60,
  min_length: 8
}));