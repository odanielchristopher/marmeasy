export interface IButton {
  type: string
  disabled?: boolean
  isLoading?: boolean
  children: JSX.Element | string
  danger?: boolean
  onClick: () => void
}

export interface StyledButtonProps {
  type: string
  disabled?: boolean
  isLoading?: boolean
  danger?: boolean
  onClick: () => void
}
