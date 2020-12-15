import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AdvancedOptionsMenu from './AdvancedOptionsMenu';
import BuildMenu from './BuildMenu';
import ChannelMenu from './ChannelMenu';
import ConfigMenu from './ConfigMenu';
import HeaderButton from './HeaderButton';
import { BuildIcon, ConfigIcon, HelpIcon, MoreOptionsActiveIcon, MoreOptionsIcon } from './Icon';
import ModeMenu from './ModeMenu';
import PopButton from './PopButton';
import { SegmentedButton, SegmentedButtonSet, SegmentedLink } from './SegmentedButton';
import ToolsMenu from './ToolsMenu';

import * as actions from './actions';
import * as selectors from './selectors';

const Header: React.FC = () => (
  <div className="header">
    <HeaderSet id="build">
      <SegmentedButtonSet>
        <ExecuteButton />
        <BuildMenuButton />
      </SegmentedButtonSet>
    </HeaderSet>
    <HeaderSet id="channel-mode">
      <SegmentedButtonSet>
        <ModeMenuButton />
        <ChannelMenuButton />
        <AdvancedOptionsMenuButton />
      </SegmentedButtonSet>
    </HeaderSet>
    <HeaderSet id="share">
      <SegmentedButtonSet>
        <ShareButton />
      </SegmentedButtonSet>
    </HeaderSet>
    <HeaderSet id="tools">
      <SegmentedButtonSet>
        <ToolsMenuButton />
      </SegmentedButtonSet>
    </HeaderSet>
    <HeaderSet id="config">
      <SegmentedButtonSet>
        <ConfigMenuButton />
      </SegmentedButtonSet>
    </HeaderSet>
    <HeaderSet id="help">
      <SegmentedButtonSet>
        <HelpButton />
      </SegmentedButtonSet>
    </HeaderSet>
  </div>
);

interface HeaderSetProps {
  id: string;
}

const HeaderSet: React.FC<HeaderSetProps> = ({ id, children }) => (
  <div className={`header__set header__set--${id}`}>{children}</div>
);

const ExecuteButton: React.FC = () => {
  const executionLabel = useSelector(selectors.getExecutionLabel);

  const dispatch = useDispatch();
  const execute = useCallback(() => dispatch(actions.performPrimaryAction()), [dispatch]);

  return (
    <SegmentedButton isBuild onClick={execute}>
      <HeaderButton rightIcon={<BuildIcon />}>
        {executionLabel}
      </HeaderButton>
    </SegmentedButton>
  );
};

const BuildMenuButton: React.FC = () => {
  const Button = React.forwardRef<HTMLButtonElement, { toggle: () => void }>(({ toggle }, ref) => (
    <SegmentedButton title="Select what to build" ref={ref} onClick={toggle}>
      <HeaderButton icon={<MoreOptionsIcon />} />
    </SegmentedButton>
  ));
  Button.displayName = 'BuildMenuButton.Button';

  return <PopButton Button={Button} Menu={BuildMenu} />;
};

const ModeMenuButton: React.FC = () => {
  const label = useSelector(selectors.getModeLabel);

  const Button = React.forwardRef<HTMLButtonElement, { toggle: () => void }>(({ toggle }, ref) => (
    <SegmentedButton title="Mode &mdash; Choose the optimization level" ref={ref} onClick={toggle}>
      <HeaderButton isExpandable>{label}</HeaderButton>
    </SegmentedButton>
  ));
  Button.displayName = 'ModeMenuButton.Button';

  return <PopButton Button={Button} Menu={ModeMenu} />;
};

const ChannelMenuButton: React.FC = () => {
  const label = useSelector(selectors.getChannelLabel);

  const Button = React.forwardRef<HTMLButtonElement, { toggle: () => void }>(({ toggle }, ref) => (
    <SegmentedButton title="Channel &mdash; Choose the Rust version" ref={ref} onClick={toggle}>
      <HeaderButton isExpandable>{label}</HeaderButton>
    </SegmentedButton>
  ));
  Button.displayName = 'ChannelMenuButton.Button';

  return <PopButton Button={Button} Menu={ChannelMenu} />;
}

const AdvancedOptionsMenuButton: React.FC = () => {
  const advancedOptionsSet = useSelector(selectors.getAdvancedOptionsSet);

  const Button = React.forwardRef<HTMLButtonElement, { toggle: () => void }>(({ toggle }, ref) => (
    <SegmentedButton title="Advanced compilation flags" ref={ref} onClick={toggle}>
      <HeaderButton icon={advancedOptionsSet ? <MoreOptionsActiveIcon /> : <MoreOptionsIcon />} />
    </SegmentedButton>
  ));
  Button.displayName = 'AdvancedOptionsMenuButton.Button';

  return <PopButton Button={Button} Menu={AdvancedOptionsMenu} />;
}

const ShareButton: React.FC = () => {
  const dispatch = useDispatch();
  const gistSave = useCallback(() => dispatch(actions.performGistSave()), [dispatch]);

  return (
    <SegmentedButton title="Create shareable links to this code" onClick={gistSave}>
      <HeaderButton>Share</HeaderButton>
    </SegmentedButton>
  );
};


const ToolsMenuButton: React.FC = () => {
  const Button = React.forwardRef<HTMLButtonElement, { toggle: () => void }>(({ toggle }, ref) => (
    <SegmentedButton title="Run extra tools on the source code" ref={ref} onClick={toggle}>
      <HeaderButton isExpandable>Tools</HeaderButton>
    </SegmentedButton>
  ));
  Button.displayName = 'ToolsMenuButton.Button';

  return <PopButton Button={Button} Menu={ToolsMenu} />;
};

const ConfigMenuButton: React.FC = () => {
  const Button = React.forwardRef<HTMLButtonElement, { toggle: () => void }>(({ toggle }, ref) => (
    <SegmentedButton title="Show the configuration options" ref={ref} onClick={toggle}>
      <HeaderButton icon={<ConfigIcon />} isExpandable>Config</HeaderButton>
    </SegmentedButton>
  ));
  Button.displayName = 'ConfigMenuButton.Button';

  return <PopButton Button={Button} Menu={ConfigMenu} />;
};

const HelpButton: React.FC = () => (
  <SegmentedLink title="View help" action={actions.navigateToHelp}>
    <HeaderButton icon={<HelpIcon />} />
  </SegmentedLink>
);

export default Header;
