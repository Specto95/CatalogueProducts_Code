import { useRef, useEffect } from "react";
import styles from './ProductDescription.module.css'

export function ProductDescription({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; 
    }
  }, [value]);

  return (
    <input
      ref={inputRef}
      type="text"
      className={styles.CPW__description}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}