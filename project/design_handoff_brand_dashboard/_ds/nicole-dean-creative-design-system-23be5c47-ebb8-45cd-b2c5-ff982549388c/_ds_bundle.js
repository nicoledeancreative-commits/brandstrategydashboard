/* @ds-bundle: {"format":4,"namespace":"NicoleDeanCreativeDesignSystem_23be5c","components":[{"name":"Badge","sourcePath":"components/badge/Badge.jsx"},{"name":"Button","sourcePath":"components/button/Button.jsx"},{"name":"Card","sourcePath":"components/card/Card.jsx"},{"name":"Input","sourcePath":"components/input/Input.jsx"},{"name":"Heading","sourcePath":"components/text/Heading.jsx"}],"sourceHashes":{"components/badge/Badge.jsx":"93749c9d20c7","components/button/Button.jsx":"f2a5fbb666fa","components/card/Card.jsx":"191a75fc5589","components/input/Input.jsx":"a6e390312c2c","components/text/Heading.jsx":"7f307e16e845"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NicoleDeanCreativeDesignSystem_23be5c = window.NicoleDeanCreativeDesignSystem_23be5c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/badge/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  children,
  variant = 'primary',
  ...props
}) {
  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'white'
    },
    secondary: {
      backgroundColor: 'var(--color-secondary)',
      color: 'white'
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
      border: '1px solid var(--color-primary)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      fontSize: 'var(--font-size-caption)',
      fontWeight: 600,
      fontFamily: 'var(--font-body)',
      ...variantStyles[variant]
    }
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badge/Badge.jsx", error: String((e && e.message) || e) }); }

// components/button/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props
}) {
  const baseStyles = {
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 200ms ease-in-out',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    opacity: disabled ? 0.5 : 1
  };
  const sizeStyles = {
    sm: {
      fontSize: '14px',
      padding: '8px 16px',
      minHeight: '32px'
    },
    md: {
      fontSize: '16px',
      padding: '12px 24px',
      minHeight: '40px'
    },
    lg: {
      fontSize: '18px',
      padding: '16px 32px',
      minHeight: '48px'
    }
  };
  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'white'
    },
    secondary: {
      backgroundColor: 'var(--color-secondary)',
      color: 'white'
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
      border: '2px solid var(--color-primary)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    style: {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant]
    },
    disabled: disabled
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/button/Button.jsx", error: String((e && e.message) || e) }); }

// components/card/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      backgroundColor: 'var(--bg-primary)',
      border: '1px solid var(--border-secondary)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      boxShadow: 'var(--shadow-sm)'
    }
  }, props), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/card/Card.jsx", error: String((e && e.message) || e) }); }

// components/input/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  type = 'text',
  placeholder,
  disabled = false,
  ...props
}) {
  const baseStyles = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--font-size-body)',
    padding: '12px 16px',
    border: '2px solid var(--border-secondary)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    transition: 'border-color 200ms ease-in-out',
    minHeight: '40px',
    boxSizing: 'border-box',
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'text'
  };
  return /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    placeholder: placeholder,
    disabled: disabled,
    style: baseStyles
  }, props));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/input/Input.jsx", error: String((e && e.message) || e) }); }

// components/text/Heading.jsx
try { (() => {
function Heading({
  level = 1,
  children,
  ...props
}) {
  const Tag = `h${level}`;
  const sizeMap = {
    1: 'var(--font-size-h1)',
    2: 'var(--font-size-h2)',
    3: 'var(--font-size-h3)'
  };
  return React.createElement(Tag, {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: sizeMap[level] || 'var(--font-size-h1)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      margin: '0 0 16px 0'
    },
    ...props
  }, children);
}
Object.assign(__ds_scope, { Heading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/text/Heading.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Heading = __ds_scope.Heading;

})();
