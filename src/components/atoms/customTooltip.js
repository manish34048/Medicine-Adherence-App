import Tooltip from 'react-native-walkthrough-tooltip';
import React from 'react';

const CustomTooltip = ({
  isVisible,
  content,
  placement,
  supportedOrientations,
  tooltipStyle,
  contentStyle,
  onClose,
  children,
}) => {
  return (
    <Tooltip
      isVisible={isVisible}
      content={content}
      placement={placement}
      supportedOrientations={supportedOrientations}
      tooltipStyle={tooltipStyle}
      contentStyle={contentStyle}
      onClose={onClose}>
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
