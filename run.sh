#!/bin/bash

# 定义项目名称、启动命令和项目目录
project_name="hechu-tools-website"
start_command="npm run start"
project_directory="."

# 检查输入参数
if [ $# -ne 1 ]; then
    echo "用法: $0 [--start | --stop]"
    exit 1
fi

# 根据参数启动或停止项目
case "$1" in
    --start)
        # 检查项目是否已经在运行
        if pgrep -f "$start_command" > /dev/null; then
            echo "$project_name 项目已经在运行"
            exit 0
        fi

        # 启动项目
        echo "启动 $project_name 项目..."
        cd "$project_directory" || exit
        echo "执行命令: $start_command"
        $start_command &
        ;;
    --stop)
        # 停止项目
        echo "停止 $project_name 项目..."
        echo "执行命令: pkill -f \"next-server\""
        pkill -f "next-server"
        ;;
    *)
        echo "未知参数: $1"
        echo "用法: $0 [--start | --stop]"
        exit 1
        ;;
esac

exit 0
