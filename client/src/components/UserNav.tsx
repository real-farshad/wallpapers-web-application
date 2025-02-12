import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import signOutUser from "../api/signOutUser";
import CoverImage from "./CoverImage";
import "../styles/UserNav.scss";

function UserNav() {
  const { user } = useUserContext();
  const { avatar, username } = user;

  const [animation, setAnimation] = useState({
    isAnimating: false,
    navOpen: false,
    expandUnderlay: false,
    showLinks: false,
  });

  function handleClickOnUserNav() {
    if (animation.isAnimating) return;

    if (!animation.navOpen) openNav();
    else closeNav();
  }

  function openNav() {
    setAnimation((prevState) => ({
      ...prevState,
      isAnimating: true,
      navOpen: true,
    }));

    setTimeout(() => {
      setAnimation((prevState) => ({
        ...prevState,
        expandUnderlay: true,
      }));
    }, 0);

    setTimeout(() => {
      setAnimation((prevState) => ({
        ...prevState,
        showLinks: true,
      }));
    }, 200);

    setTimeout(() => {
      setAnimation((prevState) => ({
        ...prevState,
        isAnimating: false,
      }));
    }, 500);
  }

  function closeNav() {
    setAnimation((prevState) => ({
      ...prevState,
      isAnimating: true,
      showLinks: false,
    }));

    setTimeout(() => {
      setAnimation((prevState) => ({
        ...prevState,
        expandUnderlay: false,
      }));
    }, 100);

    setTimeout(() => {
      setAnimation((prevState) => ({
        ...prevState,
        isAnimating: false,
        navOpen: false,
      }));
    }, 400);
  }

  async function handleSignOut() {
    const { success } = await signOutUser();
    if (success) window.location.href = "/";
  }

  return (
    <div className="user-nav" onClick={handleClickOnUserNav}>
      <div className="user-nav__primary-container">
        <div className="user-nav__info">
          <p className="user-nav__username">{username}</p>
          <p className="user-nav__time">Active</p>
        </div>

        <div className="user-nav__avatar-container">
          <div className="user-nav__avatar">
            <div className="user-nav__avatar-image">
              <CoverImage src={avatar} />
            </div>
          </div>

          <div
            className={`user-nav__underlay${
              animation.expandUnderlay ? " user-nav__underlay--expand" : ""
            }`}
          />
        </div>
      </div>

      {animation.navOpen && (
        <ul className="user-nav__links-list">
          <li className="user-nav__link-container">
            <div
              className={`user-nav__link${
                animation.showLinks ? " user-nav__link--animate-in" : ""
              }`}
            >
              <Link to="/user/likes">LIKES</Link>
            </div>
          </li>

          <li className="user-nav__link-container">
            <div
              className={`user-nav__link${
                animation.showLinks ? " user-nav__link--animate-in" : ""
              }`}
            >
              <Link to="/user/saves">SAVES</Link>
            </div>
          </li>

          <li className="user-nav__link-container">
            <div
              className={`user-nav__link${
                animation.showLinks ? " user-nav__link--animate-in" : ""
              }`}
            >
              <button onClick={handleSignOut}>SIGNOUT</button>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}

export default UserNav;
