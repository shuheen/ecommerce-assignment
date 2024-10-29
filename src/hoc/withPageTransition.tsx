import React from 'react';
import {motion} from 'framer-motion';
import {pageTransition, pageVariants} from '../config/animations';

const withPageTransition =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P) =>
    (
      <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
        <Component {...props} />
      </motion.div>
    );

export default withPageTransition;
