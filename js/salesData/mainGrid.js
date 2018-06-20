function gridReload(){
    $('#grid').data('kendoGrid').dataSource.read();
}
var dataSource = new kendo.data.DataSource({
    serverPaging : true,
    pageSize : 10,
    transport : {
        read : {
            url : '/selectSalesData',
            dataType : "json",
            type : 'POST'
        },
        parameterMap : function(data, operation) {
            data.startDate = $('#startDate').val();
            data.endDate = $('#endDate').val();
            return data;
        }
    },
    schema : {
        data : function(response) {
            console.log(response.list);
            return response.list;
        },
        total : function(response) {
            return response.totalCount;
        }
    }
});
function mainGrid(){
    //캔도 그리드 기본
    var grid = $("#grid").kendoGrid({
        dataSource: dataSource,
    
        scrollable:{
            endless: true
        },
        sortable: true,
        pageable: true,
        scrollable: true,
        editable: {
            mode: 'inline',
        },
        
        columns: [
            {
                field: "SALE_DATE",
                title: "날짜",
                width: "80px",
            },{
                field: "LN_PARTNER",
                title: "판매처",
                width: "80px"
            },{
                field: "CD_ITEM",
                title: "제품코드",
                width: "150px"
            },{
                field: "NM_ITEM",
                title: "제품명",
                width: "100px"
            },{
                field: "MAT_ITEM",
                title: "바코드",
                width: "100px"
            },{
                field: "SALE_NUM",
                title: "판매수량",
                format:"{0:n0}",
                width: "80px"
            },{
                field: "SALE_AMT",
                title: "판매금액",
                format:"{0:n0}",
                width: "80px"
            },{
                field: "ETC",
                title: "비고",
                width: "80px"
            },{
                field: "USE_YN",
                title: "사용여부",
                width: "40px"
            }],
        change: function (e){
            gridClick(e)
        }
    }).data("kendoGrid");
    
    grid.table.on("click", ".checkbox", selectRow);
    
    var checkedIds = {};
    
    // on click of the checkbox:
    function selectRow(){
        
        var checked = this.checked,
        row = $(this).closest("tr"),
        timeGrid = $('#grid').data("kendoGrid"),
        dataItem = timeGrid.dataItem(row);
        
        checkedIds[dataItem.CODE_CD] = checked;
        if (checked) {
            //-select the row
            row.addClass("k-state-selected");
        } else {
            //-remove selection
            row.removeClass("k-state-selected");
        }
        
    }
    function gridClick(){
        
    }
}	