import { Avatar, AvatarProps, Tooltip } from 'antd';

import { useAuth } from '../../../../app/hooks/useAuth';

interface CollaboratorAvatarProps extends AvatarProps {
  label: string;
  role?: string;
  tooltip?: boolean;
}

export function CollaboratorAvatar({
  label,
  role,
  tooltip = true,
  ...props
}: CollaboratorAvatarProps) {
  const { user } = useAuth();

  return (
    <Tooltip title={tooltip ? label : ''}>
      <Avatar
        {...props}
        style={{
          background:
            role === 'COMPANY'
              ? '#7E22CE'
              : user.name === label
              ? '#ef4444'
              : '',
        }}
      >
        {label
          .split(' ')
          .map((word) => word[0])
          .slice(0, 2)}
      </Avatar>
    </Tooltip>
  );
}
