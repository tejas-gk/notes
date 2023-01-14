type Tree = {
    id: number,
    name: string,
    isFolder: boolean,
    items: Tree[]
}


const useTraverseTree = () => {
    function insertNode(tree:Tree,
        folderId:number,
        item:any,
        isFolder: boolean = false):Tree
    {
        if(tree.id === folderId && tree.isFolder) {
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder: isFolder,
                items: []
            })
            return tree
        }
        let latestNode=[]
        latestNode=tree.items.map((node) => {
            return insertNode(node, folderId, item, isFolder)
        })

        return { ...tree, items: latestNode}

    }

    function deleteNode(tree:Tree, nodeId:number):Tree {
        if(tree.id === nodeId) {
            return tree
        }
        let latestNode=[]
        latestNode=tree.items.map((node) => {
            return deleteNode(node, nodeId)
        })

        return { ...tree, items: latestNode}
    }

    function renameNode(tree: Tree, nodeId: number, newName: string): Tree {
        if (tree.id === nodeId) {
            return { ...tree, name: newName }
        }
        let latestNode = []
        latestNode = tree.items.map((node) => {
            return renameNode(node, nodeId, newName)
        })
        return { ...tree, items: latestNode }
    }

    function moveNode(tree: Tree, nodeId: number, folderId: number): Tree {
        if (tree.id === nodeId) {
            return tree
        }
        let latestNode = []
        latestNode = tree.items.map((node) => {
            return moveNode(node, nodeId, folderId)
        }
        )
        return { ...tree, items: latestNode }
    }
          

    return {
        insertNode,
        deleteNode,
        renameNode,
        moveNode
    }
}

export default useTraverseTree