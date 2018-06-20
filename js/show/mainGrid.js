function gridReload(){
    $('#grid').data('kendoGrid').dataSource.read();
}
var dataSource = new kendo.data.DataSource({
    serverPaging : true,
    pageSize : 10,
    transport : {
        read : {
            url : '/selectItem',
            dataType : "json",
            type : 'POST'
        },
        parameterMap : function(data, operation) {
            data.cdItem = $('#cdItem').val();
            data.nmItem = $('#nmItem').val();
            return data;
        }
    },
    schema : {
        data : function(response) {
            console.log(response);
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
        toolbar: ["excel"],
        excel: {
            fileName: "마케팅 리스트.xlsx",
            proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
            filterable: true
        },
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
                field: "CD_COMPANY",
                title: "회사코드",
                width: "80px"
            },{
                field: "NM_ITEM",
                title: "제품명",
                width: "80px"
            },{
                field: "CD_ITEM",
                title: "제품코드",
                width: "100px"
            },{
                field: "FILENAME",
                title: "파일명",
                width: "150px"
            },{
                field: "FILETYPE",
                title: "확장자",
                width: "80px"
            },{
                field: "ETC",
                title: "비고",
                width: "80px"
            },{
                field: "USE_YN",
                title: "사용여부",
                width: "80px"
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