// MotionLink.tsx
import {Link, LinkProps} from 'react-router-dom';
import {motion, MotionProps} from 'framer-motion';
import React from 'react';

type MotionLinkProps = LinkProps & MotionProps;

const MotionLink = motion.create(Link);

const AnimatedLink = React.forwardRef<HTMLAnchorElement, MotionLinkProps>((props, ref) => {
  return <MotionLink ref={ref} {...props} />;
});

AnimatedLink.displayName = 'AnimatedLink';

export default AnimatedLink;
