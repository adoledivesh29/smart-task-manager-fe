import { Button, CircularProgress, Dialog, DialogActions, DialogContent, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const CustomModal = ({ title, subtitle, isLoading = false, open = false, handleClose, handleConfirm, children, hideSubtitle = false, hideConfirm = false, hideCancel = false, isForm = false, className = '', isDisabled = false, maxWidth = 'md' }) => {
    return (
        <>
            {isForm ? (
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth={maxWidth}
                    className='custom-modal custom-modal-form'
                >
                    <div className="custom-modal-header">
                        <div className="modal-title">{title}</div>
                        {/* Add String or HTML Content in Subtitle */}
                        {subtitle && <div className="modal-subtitle" dangerouslySetInnerHTML={{ __html: subtitle }} />}
                        <Button aria-label="close" className='btn-custom-close' onClick={handleClose}>
                            <CloseIcon />
                        </Button>
                    </div>
                    <DialogContent className='custom-modal-content'>
                        {children}
                    </DialogContent>
                </BootstrapDialog>
            ) : (
                <BootstrapDialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    className={`custom-modal ${ className }`}
                    maxWidth={maxWidth}
                >
                    <div className="custom-modal-header">
                        <div className="modal-title">{title}</div>
                        {/* Add String or HTML Content in Subtitle */}
                        {!hideSubtitle && <div className="modal-subtitle" dangerouslySetInnerHTML={{ __html: subtitle }} />}
                        <Button aria-label="close" className='btn-custom-close' onClick={handleClose}>
                            <CloseIcon />
                        </Button>
                    </div>
                    {children && <DialogContent>{children}</DialogContent>}
                    {!hideConfirm && !hideCancel && (
                        <DialogActions className={`d-flex ${ !hideConfirm ? 'justify-content-end' : 'justify-content-center' }`}>
                            {!hideCancel && <Button autoFocus onClick={handleClose} className='btn-custom-action btn-custom-discard' disabled={isLoading || isDisabled}>{hideConfirm ? 'Close' : 'Cancel'}</Button>}
                            {!hideConfirm &&
                                <Button autoFocus onClick={handleConfirm} disabled={isLoading || isDisabled} className='btn-custom-action btn-custom-confirm d-flex align-items-center gap-2'>
                                    Confirm {isLoading ? <CircularProgress size={15} /> : ''}
                                </Button>
                            }
                        </DialogActions>
                    )}
                </BootstrapDialog>
            )}

        </>
    )
}

export default CustomModal
