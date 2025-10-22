import * as React from "react";

const cn = (...classes) => classes.filter(Boolean).join(' ');

function Select({ children, value, onValueChange, className, ...props }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  // Build a map of item value -> label to display selected label
  const itemsMap = {};
  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) return;
    if (child.type === SelectContent) {
      React.Children.forEach(child.props.children, item => {
        if (!React.isValidElement(item)) return;
        if (item.type === SelectItem && item.props.value !== undefined) {
          itemsMap[item.props.value] = item.props['data-label'] ?? item.props.children;
        }
      });
    }
  });

  const selectedLabel = value !== undefined ? itemsMap[value] : undefined;

  return (
    <div className={cn('relative', className)} ref={ref} {...props}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: (e) => {
              e?.preventDefault?.();
              setOpen(prev => !prev);
              child.props.onClick?.(e);
            },
            selectedLabel,
            open
          });
        }
        if (child.type === SelectContent) {
          // Render content only when open
          if (!open) return null;
          return React.cloneElement(child, {}, React.Children.map(child.props.children, item => {
            if (!React.isValidElement(item)) return item;
            if (item.type === SelectItem) {
              return React.cloneElement(item, {
                onClick: (e) => {
                  e?.stopPropagation?.();
                  onValueChange?.(item.props.value);
                  setOpen(false);
                  item.props.onClick?.(e);
                }
              });
            }
            return item;
          }));
        }
        return child;
      })}
    </div>
  );
}

function SelectTrigger({ className, children, selectedLabel, open, ...props }) {
  // Render children but replace SelectValue with selected label when provided
  const processedChildren = React.Children.map(children, child => {
    if (!React.isValidElement(child)) return child;
    if (child.type === SelectValue) {
      return React.cloneElement(child, { children: selectedLabel ?? child.props.placeholder });
    }
    return child;
  });

  return (
    <button
      className={cn(className)}
      {...props}
    >
      {processedChildren}
    </button>
  );
}

function SelectContent({ children, ...props }) {
  return (
    <div
      {...props}
      style={{
        position: 'absolute',
        zIndex: 50,
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
        marginTop: 6,
        minWidth: 160
      }}
    >
      {children}
    </div>
  );
}

function SelectItem({ children, value, ...props }) {
  return (
    <div
      {...props}
      data-value={value}
      data-label={typeof children === 'string' ? children : undefined}
      style={{
        padding: '8px 12px',
        cursor: 'pointer',
        fontSize: 14,
        borderBottom: '1px solid #f3f4f6'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      {children}
    </div>
  );
}

function SelectValue({ placeholder, children, ...props }) {
  return (
    <span className="truncate" {...props}>
      {children ?? placeholder ?? "Select an option"}
    </span>
  );
}

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
};
