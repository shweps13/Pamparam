import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
  const useDiscoverStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 800,
      height: 600,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
    },
  }));

  const useMessageStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      height: '50%',
      backgroundColor: theme.palette.background.paper,
      borderRadius: 10,
      boxShadow: theme.shadows[5],
      justifyContent: 'center',
      maxHeight: 'calc(100% - 40px)'
    },
  }));

export { getModalStyle, useStyles, useDiscoverStyles, useMessageStyles };