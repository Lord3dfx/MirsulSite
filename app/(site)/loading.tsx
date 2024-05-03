import styles from './page.module.css'

export default function Loading() {
    return (
<div className={styles.divloading}>
<div className={styles.loading}></div>
<p className={styles.ploading}>Загрузка...</p>
</div>
)}