
let border = '1px solid #cdcdcd';
KG.Grid = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        Meteor.subscribe('DB.People');

        let sort = {
            'createTime' : -1
        };

        let data = DB.People.find({}, {sort : sort}).fetch();

        return data;
    },

    getItemStyle : function(){
        return {
            border : border,
            padding: '2px 12px'
        };
    },

    gridHeaderRender : function(){
        let itemStyle = this.getItemStyle();

        return <thead ><tr>
                <th style={itemStyle}>
                    id
                </th>
                <th style={itemStyle}>
                    Name
                </th>
                <th style={itemStyle}>
                    Sex
                </th>
                <th style={itemStyle}>
                    Description
                </th>
                <th style={itemStyle}>
                    Action
                </th>
            </tr>
            </thead>;
    },

    delete : function(item){

        console.log(item._id);
        let id = item._id;

        DB.People.remove({_id:id});

    },

    gridRender : function(){
        let itemStyle = this.getItemStyle();

        let style = {
        };


        return <tbody style={style}>
        {
            _.map(this.data, (item, index)=>{
                return <tr key={index}>
                    <td style={itemStyle}>
                        {item._id}
                    </td>
                    <td style={itemStyle}>
                        {item.name}
                    </td>
                    <td style={itemStyle}>
                        {item.sex}
                    </td>
                    <td style={itemStyle}>
                        {item.description}
                    </td>
                    <td style={itemStyle}>
                        <RC.Button theme="inline" bgColor="#ff0000" onClick={this.delete.bind(this, item)}>Delete</RC.Button>
                    </td>
                </tr>;
            })
        }
        </tbody>;

    },

    render : function(){
        let style = {
            padding : '10px 15px',
            background : '#fff',
            width : '100%',
            textAlign : 'left',
            borderSpacing : '0'
        };

        return <table style={style}>
            {this.gridHeaderRender()}
            {this.gridRender()}
        </table>;
    }
});
