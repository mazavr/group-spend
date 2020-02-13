export const dialogTypes = {
  ALERT: 'ALERT',
  CONFIRM: 'CONFIRM'
};

export default function ModalDialog(props) {
  this.type = props.type || dialogTypes.ALERT;
  this.header = props.header || '';
  this.body = props.body || '';
  this.okClick = props.okClick || null;
}
