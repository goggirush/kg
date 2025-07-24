import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from './Header.module.scss';
import logo from '@/public/images/logo.png'; // assuming logo is in /public/logo.png

const Header = () => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const user = session?.user;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.header__content__left}>
        <Link href="/" className={styles.header__link}>
          <div className={styles.header__title}>
            <Image src={logo} alt="Scania KG" style={{ height: '80%' }} priority />
          </div>
        </Link>
      </div>

      {session && (
        <div className={styles.header__content__center}>
          <Link href="/courses" className={styles.header__link}>
            <div className={styles.header__content__center__item}>Courses</div>
          </Link>
          <Link href="/sparql-playground" className={styles.header__link}>
            <div className={styles.header__content__center__item}>SPARQL Playground</div>
          </Link>
          <Link href="/kg-playground" className={styles.header__link}>
            <div className={styles.header__content__center__item}>KG Playground</div>
          </Link>
        </div>
      )}

      <div className={styles.header__content__right}>
        <div
          className={styles.header__avatarWrapper}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          ref={dropdownRef}
        >
          <img
            src="https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg"
            alt="User Avatar"
          />
          {dropdownOpen && (
            <div className={styles.header__dropdownMenu}>
              {session ? (
                <>
                  <div className={styles.header__dropdownInfo}>
                    <span className={styles.header__dropdownInfo__name}>{user?.name}</span>
                    <span className={styles.header__dropdownInfo__email}>{user?.email}</span>
                  </div>
                  <Link href="/profile">
                    <div className={styles.header__dropdownItem}>Profile</div>
                  </Link>
                  <div
                    className={styles.header__dropdownItem}
                    onClick={() => signOut()}
                  >
                    Sign out
                  </div>
                </>
              ) : (
                <div
                  className={styles.header__dropdownItem}
                  onClick={() => signIn('azure-ad')}
                >
                  Sign in
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
