import React, { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import s from './date-picker.module.scss';

function parseYMD(str) {
  if (!str || typeof str !== 'string') return null;
  const m = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const y = parseInt(m[1], 10);
  const mo = parseInt(m[2], 10) - 1;
  const d = parseInt(m[3], 10);
  const date = new Date(y, mo, d);
  if (date.getFullYear() !== y || date.getMonth() !== mo || date.getDate() !== d) return null;
  return date;
}

function toYMD(date) {
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${mo}-${d}`;
}

function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function compareDay(a, b) {
  return startOfDay(a) - startOfDay(b);
}

function clampMonthYear(y, m, minD, maxD) {
  const first = new Date(y, m, 1);
  const last = new Date(y, m + 1, 0);
  if (compareDay(last, minD) < 0) {
    return [minD.getFullYear(), minD.getMonth()];
  }
  if (compareDay(first, maxD) > 0) {
    return [maxD.getFullYear(), maxD.getMonth()];
  }
  return [y, m];
}

const DatePicker = ({
  id,
  name,
  value = '',
  onChange,
  min,
  max,
  placeholder = '',
  locale = 'tr-TR',
  className = '',
  hasError = false,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
  disabled = false,
  onBlur,
  calendarAriaLabel = 'Calendar',
}) => {
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0, width: 280 });

  const minDate = useMemo(() => parseYMD(min), [min]);
  const maxDate = useMemo(() => parseYMD(max), [max]);

  const defaultView = useMemo(() => {
    const parsed = parseYMD(value);
    if (parsed && minDate && maxDate) {
      if (compareDay(parsed, minDate) >= 0 && compareDay(parsed, maxDate) <= 0) return parsed;
    }
    if (maxDate) return maxDate;
    if (minDate) return minDate;
    return new Date();
  }, [value, minDate, maxDate]);

  const [viewYear, setViewYear] = useState(defaultView.getFullYear());
  const [viewMonth, setViewMonth] = useState(defaultView.getMonth());

  useEffect(() => {
    if (!open) return;
    const d = parseYMD(value);
    if (d && minDate && maxDate && compareDay(d, minDate) >= 0 && compareDay(d, maxDate) <= 0) {
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    } else {
      setViewYear(defaultView.getFullYear());
      setViewMonth(defaultView.getMonth());
    }
  }, [open, value, minDate, maxDate, defaultView]);

  useEffect(() => {
    if (!minDate || !maxDate) return;
    const [ny, nm] = clampMonthYear(viewYear, viewMonth, minDate, maxDate);
    if (ny !== viewYear || nm !== viewMonth) {
      setViewYear(ny);
      setViewMonth(nm);
    }
  }, [viewYear, viewMonth, minDate, maxDate]);

  const monthFormatter = useMemo(() => new Intl.DateTimeFormat(locale, { month: 'long' }), [locale]);
  const weekdayFormatter = useMemo(() => new Intl.DateTimeFormat(locale, { weekday: 'short' }), [locale]);
  const displayFormatter = useMemo(() => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }), [locale]);

  const weekdayLabels = useMemo(() => {
    const labels = [];
    const base = new Date(2024, 0, 1);
    for (let i = 0; i < 7; i += 1) {
      const d = new Date(base);
      d.setDate(1 + i);
      labels.push(weekdayFormatter.format(d));
    }
    return labels;
  }, [weekdayFormatter]);

  const yearRange = useMemo(() => {
    if (!minDate || !maxDate) return [];
    const y0 = minDate.getFullYear();
    const y1 = maxDate.getFullYear();
    const arr = [];
    for (let y = y0; y <= y1; y += 1) arr.push(y);
    return arr;
  }, [minDate, maxDate]);

  const monthOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      value: i,
      label: monthFormatter.format(new Date(2024, i, 1)),
    }));
  }, [monthFormatter]);

  const calendarCells = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const startPad = (first.getDay() + 6) % 7;
    const base = new Date(viewYear, viewMonth, 1 - startPad);
    const cells = [];
    for (let i = 0; i < 42; i += 1) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      cells.push(d);
    }
    return cells;
  }, [viewYear, viewMonth]);

  const today = useMemo(() => startOfDay(new Date()), []);

  const isInViewMonth = (d) => d.getMonth() === viewMonth && d.getFullYear() === viewYear;

  const isDisabled = useCallback(
    (d) => {
      if (!minDate || !maxDate) return true;
      return compareDay(d, minDate) < 0 || compareDay(d, maxDate) > 0;
    },
    [minDate, maxDate],
  );

  const canPrevMonth = useMemo(() => {
    if (!minDate) return false;
    const lastOfPrevMonth = new Date(viewYear, viewMonth, 0);
    return compareDay(lastOfPrevMonth, minDate) >= 0;
  }, [viewYear, viewMonth, minDate]);

  const canNextMonth = useMemo(() => {
    if (!maxDate) return false;
    const firstOfNextMonth = new Date(viewYear, viewMonth + 1, 1);
    return compareDay(firstOfNextMonth, maxDate) <= 0;
  }, [viewYear, viewMonth, maxDate]);

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelect = (d) => {
    if (isDisabled(d) || !isInViewMonth(d)) return;
    onChange?.(toYMD(d));
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const uid = useId();
  const popoverId = `${uid}-popover`;

  const updatePopoverPosition = useCallback(() => {
    if (!open || !triggerRef.current) return;
    const tr = triggerRef.current.getBoundingClientRect();
    const gutter = 8;
    const w = Math.max(tr.width, 280);
    let left = Math.max(8, Math.min(tr.left, window.innerWidth - w - 8));
    let top = tr.bottom + gutter;
    const pop = popoverRef.current;
    const popH = pop?.offsetHeight ?? 0;
    if (popH > 0 && top + popH > window.innerHeight - 8 && tr.top > popH + gutter) {
      top = tr.top - popH - gutter;
    }
    setPopoverPos({ top, left, width: w });
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return undefined;
    updatePopoverPosition();
    let raf2;
    const raf1 = requestAnimationFrame(() => {
      updatePopoverPosition();
      raf2 = requestAnimationFrame(() => updatePopoverPosition());
    });
    const onScrollResize = () => updatePopoverPosition();
    window.addEventListener('scroll', onScrollResize, true);
    window.addEventListener('resize', onScrollResize);
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2 != null) cancelAnimationFrame(raf2);
      window.removeEventListener('scroll', onScrollResize, true);
      window.removeEventListener('resize', onScrollResize);
    };
  }, [open, updatePopoverPosition, viewYear, viewMonth]);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (ev) => {
      const t = ev.target;
      if (rootRef.current?.contains(t) || popoverRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (ev) => {
      if (ev.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const displayValue = useMemo(() => {
    const d = parseYMD(value);
    if (!d) return '';
    return displayFormatter.format(d);
  }, [value, displayFormatter]);

  const selectedDate = useMemo(() => parseYMD(value), [value]);

  const cn = (...parts) => parts.filter(Boolean).join(' ');

  return (
    <div className={cn(s.root, className)} ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        className={cn(s.trigger, hasError && s.triggerError)}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? popoverId : undefined}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        onClick={() => !disabled && setOpen((o) => !o)}
        onBlur={(e) => {
          const next = e.relatedTarget;
          if (rootRef.current?.contains(next) || popoverRef.current?.contains(next)) return;
          onBlur?.(e);
        }}
      >
        <span className={cn(s.triggerValue, !displayValue && s.triggerPlaceholder)}>
          {displayValue || placeholder}
        </span>
        <FiCalendar className={s.triggerIcon} aria-hidden />
      </button>
      {name ? <input type="hidden" name={name} value={value} readOnly /> : null}

      {open && minDate && maxDate
        ? createPortal(
            <div
              ref={popoverRef}
              id={popoverId}
              className={s.popover}
              style={{
                top: popoverPos.top,
                left: popoverPos.left,
                width: popoverPos.width,
              }}
              role="dialog"
              aria-label={calendarAriaLabel}
            >
              <div className={s.head}>
                <button type="button" className={s.navBtn} onClick={goPrev} disabled={!canPrevMonth} aria-label="Previous month">
                  <FiChevronLeft size={20} aria-hidden />
                </button>
                <div className={s.selects}>
                  <select
                    className={s.select}
                    value={viewMonth}
                    onChange={(e) => {
                      const m = parseInt(e.target.value, 10);
                      const [ny, nm] = clampMonthYear(viewYear, m, minDate, maxDate);
                      setViewYear(ny);
                      setViewMonth(nm);
                    }}
                    aria-label="Month"
                  >
                    {monthOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <select
                    className={s.select}
                    value={viewYear}
                    onChange={(e) => {
                      const y = parseInt(e.target.value, 10);
                      const [ny, nm] = clampMonthYear(y, viewMonth, minDate, maxDate);
                      setViewYear(ny);
                      setViewMonth(nm);
                    }}
                    aria-label="Year"
                  >
                    {yearRange.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="button" className={s.navBtn} onClick={goNext} disabled={!canNextMonth} aria-label="Next month">
                  <FiChevronRight size={20} aria-hidden />
                </button>
              </div>
              <div className={s.weekdays}>
                {weekdayLabels.map((label) => (
                  <div key={label} className={s.weekday}>
                    {label}
                  </div>
                ))}
              </div>
              <div className={s.grid}>
                {calendarCells.map((d, idx) => {
                  const inMonth = isInViewMonth(d);
                  const dis = isDisabled(d);
                  const sel = selectedDate && compareDay(d, selectedDate) === 0;
                  const isToday = compareDay(d, today) === 0;

                  return (
                    <button
                      key={`${d.getTime()}-${idx}`}
                      type="button"
                      className={cn(
                        s.day,
                        !inMonth && s.dayMuted,
                        isToday && inMonth && s.dayToday,
                        sel && s.daySelected,
                      )}
                      disabled={dis || !inMonth}
                      onClick={() => handleSelect(d)}
                      aria-label={d.toDateString()}
                      aria-pressed={sel}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};

export default DatePicker;
