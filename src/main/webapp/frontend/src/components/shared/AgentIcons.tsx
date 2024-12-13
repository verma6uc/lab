import React from 'react';
import { FaBrain, FaSearch, FaLightbulb, FaPaintBrush, FaDatabase, FaCogs, FaNetworkWired, FaClipboardCheck, FaRocket } from 'react-icons/fa';

interface IconProps {
  size?: number;
  color?: string;
}

const SeldonIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => <FaBrain size={size} color={color} />;
const BaleyIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => <FaSearch size={size} color={color} />;
const FastolfeIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => <FaLightbulb size={size} color={color} />;
const DorsIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => <FaPaintBrush size={size} color={color} />;
const DaneelIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => <FaDatabase size={size} color={color} />;
const AmadiroIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => <FaCogs size={size} color={color} />;
const GiskardIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => <FaNetworkWired size={size} color={color} />;
const CalvinIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => <FaClipboardCheck size={size} color={color} />;
const VasiliaIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => <FaRocket size={size} color={color} />;

export const AgentIconMap = {
  Seldon: SeldonIcon,
  Baley: BaleyIcon,
  Fastolfe: FastolfeIcon,
  Dors: DorsIcon,
  Daneel: DaneelIcon,
  Amadiro: AmadiroIcon,
  Giskard: GiskardIcon,
  Calvin: CalvinIcon,
  Vasilia: VasiliaIcon
}; 