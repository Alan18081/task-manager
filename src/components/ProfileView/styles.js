export default ({spacing: {unit},breakpoints}) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center',
        marginBottom: unit * 2
    },
    content: {
        display: 'flex',
        alignItems: 'flex-start',
        [breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    info: {
        flexGrow: 1
    },
    status: {
        display: 'flex',
        alignItems: 'center'
    },
    statusIcon: {
        marginRight: unit
    }
});