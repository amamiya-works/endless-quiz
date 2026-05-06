"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
    size?: "sm" | "md" | "lg" | "xl"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {

        const variants = {
            primary: "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25 border-b-4 border-primary/50 active:border-b-0 active:translate-y-[4px]",
            secondary: "bg-card text-card-foreground border border-subtle/20 hover:bg-subtle/10",
            outline: "border-2 border-primary text-primary hover:bg-primary/10",
            ghost: "text-foreground hover:bg-subtle/10",
            danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25",
        }

        const sizes = {
            sm: "h-9 px-3 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg",
            xl: "h-16 px-10 text-xl font-bold",
        }

        // Modern "Premium" feel:
        // - Press effect (scale down slightly)
        // - Smooth transition

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.96 }}
                className={cn(
                    "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        )
    }
)
Button.displayName = "Button"

export { Button }
