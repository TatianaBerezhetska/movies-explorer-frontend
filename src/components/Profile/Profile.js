import './Profile.css';

function Profile({onEditProfile, onLogOut}) {
  return (
    <section className="profile">
      <h2 className="profile__greeting">Привет, Татьяна!</h2>
      <div className="profile__userdata">
        <p className="profile__data bold-text">Имя</p>
        <p className="profile__data profile__data_right">Татьяна</p>
        <p className="profile__data bold-text">E-mail</p>
        <p className="profile__data profile__data_right">pochta@yandex.ru</p>
      </div>
      <button className="profile__edit" type="button" onClick={onEditProfile}>Редактировать</button>
      <button className="profile__logout" type="button" onClick={onLogOut}>Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;
