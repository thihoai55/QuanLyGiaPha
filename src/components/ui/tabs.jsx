import * as React from "react";

const cn = (...classes) => classes.filter(Boolean).join(' ');

function Tabs({ value, defaultValue, onValueChange, className, children, ...props }) {
  const [internal, setInternal] = React.useState(defaultValue);
  const activeTab = value !== undefined ? value : internal;
  const setActiveTab = (v) => {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
}

const TabsList = React.forwardRef(function TabsList({ className, children, activeTab, setActiveTab, style, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("inline-flex", className)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        borderRadius: 10,
        background: '#fffbeb',
        border: '1px solid #fde68a',
        padding: 4,
        flexWrap: 'wrap',
        position: 'relative',
        ...style
      }}
      {...props}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
});

function TabsTrigger({ value, className, children, activeTab, setActiveTab, style, ...props }) {
  const isActive = activeTab === value;
  
  return (
    <button
      data-value={value}
      className={cn(className)}
      style={{
        padding: '8px 12px',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        border: isActive ? '1px solid #f59e0b' : '1px solid transparent',
        color: isActive ? '#fff' : '#374151',
        background: isActive ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'transparent',
        position: 'relative',
        zIndex: 1,
        ...style
      }}
      onClick={() => setActiveTab(value)}
      onFocus={(e) => { e.currentTarget.style.outline = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
      onMouseDown={(e) => e.preventDefault()}
      {...props}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, className, children, activeTab, ...props }) {
  if (activeTab !== value) return null;
  
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};
