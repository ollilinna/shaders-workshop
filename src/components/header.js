import React from 'react'
import { Link } from 'gatsby'
import styles from './header.module.scss'

const Header = () => (
  <div className={styles.header}>
      <Link className={styles.header_link} to='/'>Box</Link>
      <Link className={`${styles.header_link} ${styles.header_right}`} to='/quad/'>Quad</Link>
      <Link className={`${styles.header_link}`} to='/gpgpu/'>GPGPU</Link>
  </div>
)

export default Header
